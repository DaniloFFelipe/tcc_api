import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Subject from 'App/Models/Subject'

export default class SubjectSeeder extends BaseSeeder {
  public async run() {
    await Subject.createMany([
      { name: 'Matemática', slug: 'matematica' },
      { name: 'Línguas', slug: 'linguas' },
      { name: 'História', slug: 'história' },
      { name: 'Física', slug: 'física' },
      { name: 'Biologia', slug: 'biologia' },
      { name: 'Química', slug: 'quimica' },
      { name: 'Geografia', slug: 'geografia' },
      { name: 'Filosofia', slug: 'filosofia' },
      { name: 'Sociologia', slug: 'sociologia' },
    ])
  }
}
