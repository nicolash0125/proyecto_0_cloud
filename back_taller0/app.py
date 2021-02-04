from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)
login_manager = LoginManager()
login_manager.init_app(app)
# Set the secret key to some random bytes. Keep this really secret!
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

class Evento(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    nombre = db.Column( db.String(50) )
    categoria = db.Column( db.String(255) )
    lugar = db.Column( db.String(255) )
    direccion = db.Column( db.String(255) )
    fechaInicio = db.Column( db.Date() )
    fechaFin = db.Column( db.Date() )
    presencialidad = db.Column( db.Boolean() )
    idUsuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    correo = db.Column( db.String(50) )
    contrasena = db.Column( db.String(50) )
    eventos = db.relationship('Evento', backref='usuario', lazy=True)
    # Flask-Login integration
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)

    def is_admin(self):
        return self.admin

    
class Evento_Schema(ma.Schema):
    class Meta:
        fields = ("id", "nombre", "categoria", "lugar", "direccion", "fechaInicio", "fechaFin", "presencialidad")

class Usuario_Schema(ma.Schema):
    class Meta:
        fields = ("id", "correo", "contrasena")
    
evento_schema = Evento_Schema()
eventos_schema = Evento_Schema(many = True)

usuario_schema = Usuario_Schema()
usuarios_schema = Usuario_Schema(many = True)

class RecursoListarEventos(Resource):
    def get(self):
        if not current_user.is_authenticated:
            return {'error':'inicie sesion'},401
        usuario = Usuario.query.filter_by(id=current_user.id).first()
        eventos = usuario.eventos
        return eventos_schema.dump(eventos)
    
    def post(self):
            if not current_user.is_authenticated:
                return {'error':'inicie sesion'}
            print(current_user.id)
            nuevo_evento = Evento(
                nombre = request.json['nombre'],
                categoria = request.json['categoria'],
                lugar = request.json['lugar'],
                direccion = request.json['direccion'],
                fechaInicio = datetime.strptime(request.json['fechaInicio'], '%d/%m/%Y'),
                fechaFin = datetime.strptime(request.json['fechaFin'], '%d/%m/%Y'),
                presencialidad = request.json['presencialidad'],
                idUsuario = current_user.id
            )
            if nuevo_evento.categoria not in ['Conferencia','Seminario','Congreso','Curso']:
                    return {"error":"La categoria '"+nuevo_evento.categoria+"' es invalida"}
            db.session.add(nuevo_evento)
            db.session.commit()
            return evento_schema.dump(nuevo_evento)
     
class RecursoUnEvento(Resource):
    def get(self, id_evento):
        if not current_user.is_authenticated:
            return {'error':'inicie sesion'}
        evento = Evento.query.get_or_404(id_evento)
        if evento.idUsuario != current_user.id:
            return {'error':'acceso denegado'}
        return evento_schema.dump(evento)
    
    def put(self, id_evento):

        if not current_user.is_authenticated:
            return {'error':'inicie sesion'}

        evento = Evento.query.get_or_404(id_evento)
        if evento.idUsuario != current_user.id:
            return {'error':'acceso denegado'}
            
        if 'nombre' in request.json:
            evento.nombre = request.json['nombre']
        if 'categoria' in request.json:
            evento.categoria = request.json['categoria']
        if 'lugar' in request.json:
            evento.lugar = request.json['lugar']
        if 'direccion' in request.json:
            evento.direccion = request.json['direccion']
        if 'fechaInicio' in request.json:
            evento.fechaInicio = datetime.strptime(request.json['fechaInicio'], '%d/%m/%Y')
        if 'fechaFin' in request.json:
            evento.fechaFin = datetime.strptime(request.json['fechaFin'], '%d/%m/%Y')
        if 'presencialidad' in request.json:
            evento.presencialidad = request.json['presencialidad']
            
        db.session.commit()
        return evento_schema.dump(evento)

    def delete(self, id_evento):
        evento = Evento.query.get_or_404(id_evento)
        db.session.delete(evento)
        db.session.commit()
        return '', 204

api.add_resource(RecursoListarEventos, '/eventos')     
api.add_resource(RecursoUnEvento, '/eventos/<int:id_evento>')


#API usuarios

class RecursoLogin(Resource):
    def post(self):
        if current_user.is_authenticated:
            return {'ok':'sesion iniciada'}
        correo = request.json['correo']
        contrasena = request.json['contrasena']
        usuario = Usuario.query.filter_by(correo=correo).first()
        if not usuario:
            return {'error':'Usuario no existe'},401
        if not usuario.contrasena == contrasena:
            return {'error':'Contrasena incorrecta'},401
        login_user(usuario)

        return {'ok':"Inicio sesion"}

class RecursoRegistro(Resource):
    def post(self):
        correo = request.json['correo']
        contrasena = request.json['contrasena']
        usuario = Usuario.query.filter_by(correo=correo).first()
        if usuario:
            return {'error':'usuario existente'}
        usuario = Usuario(correo=correo, contrasena=contrasena)
        db.session.add(usuario)
        db.session.commit()
        return evento_schema.dump(usuario)

class RecursoLogout(Resource):
    def get(self):
        logout_user()
        return {'ok':'sesion cerrada'}

api.add_resource(RecursoLogin, '/login')     
api.add_resource(RecursoRegistro, '/registro')
api.add_resource(RecursoLogout, '/logout')

@login_manager.user_loader
def load_user(user_id):
    return Usuario.query.get(int(user_id))

if __name__ == '__main__':
    app.run(debug=True)
