import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}
class CreateAppoimentService {
  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmetsRepository = getCustomRepository(AppointmentsRepository);

    const appointmetDate = startOfHour(date);

    const findAppointmetInSameDate = appointmetsRepository.findByDate(
      appointmetDate,
    );

    if (findAppointmetInSameDate) {
      throw Error('This appointmet is already booked');
    }

    const appointment = appointmetsRepository.create({
      provider,
      date: appointmetDate,
    });

    await appointmetsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppoimentService;
