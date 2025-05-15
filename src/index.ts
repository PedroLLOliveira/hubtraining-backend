import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './database';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger'; 
import authRoutes from './routes/auth.routes';
import planRoutes from './routes/plan.routes';
import userPlanRoutes from './routes/userPlan.routes';
// import workoutRoutes from './routes/work.routes';
import workoutExerciseRoutes from './routes/workoutExercise.routes';
import workoutLikeRoutes from './routes/workoutLike.routes';
import stripeWebhook from './webhooks/stripeWebhook';
import exerciseRouter from './controllers/ExerciseController';
import workoutRouter from './controllers/WorkoutController';
dotenv.config();

const app = express();
app.use('/webhooks', stripeWebhook);
// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/plans', planRoutes);
app.use('/api/v1/user-plans', userPlanRoutes);
app.use('/api/v1/workouts', workoutRouter);
app.use('/api/v1/workout-exercises', workoutExerciseRoutes);
app.use('/api/v1/workout-likes', workoutLikeRoutes);
app.use('/api/v1/exercises', exerciseRouter);

// Sincronizando o banco de dados com os modelos definidos
sequelize.sync().then(() => {
    console.log('Database synchronized');
}).catch((error) => {
    console.error('Error syncing database:', error);
});
  

// Iniciando o servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
});

export default app;
