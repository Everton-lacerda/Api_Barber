import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppoimentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = appointmentsRepository.find();
  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider, date } = req.body;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointmentsService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider,
    });
    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
