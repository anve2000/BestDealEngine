import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DataSource,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'anve',
        password: 'Lotus@2405$',
        database: 'test',
        entities: [__dirname + '/../**/*.entity{.ts}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
