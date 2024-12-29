import bcrypt from 'bcrypt';
import db from '../../models/index.js';

const authController = {
  async register(req, reply) {
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newauth = await db.User.create({
        fullName,
        email,
        password: hashedPassword,
      });

      reply.send({
        message: 'User registered successfully!',
        user: {
          id: newauth.id,
          fullName: newauth.fullName,
          email: newauth.email,
        },
      });
    } catch (err) {
      reply.code(500).send({ error: 'User registration failed!', details: err.message });
    }
  },

  async login(req, reply) {
    const { email, password } = req.body;
  
    try {
      const user = await db.User.findOne({ where: { email } });
      if (!user) {
        return reply.code(404).send({ error: 'User not found!' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return reply.code(401).send({ error: 'Invalid credentials!' });
      }
  
      
      const token = req.server.jwt.sign({ id: user.id, email: user.email });
  
      
      reply.send({
        message: 'Login successful!',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,  
        },
        token: token, 
      });
    } catch (err) {
      reply.code(500).send({ error: 'Login failed!', details: err.message });
    }
  }
  
};

export default authController;
