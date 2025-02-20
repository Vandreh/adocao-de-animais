import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOngNotificationTable1641488744583
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'ongsNotifications',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'read',
            type: 'boolean',
            default: false
          },
          {
            name: 'subject',
            type: 'varchar',
          },
          {
            name: 'ongId',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    ),
      await queryRunner.createForeignKey(
        'ongsNotifications',
        new TableForeignKey({
          columnNames: ['ongId'],
          referencedTableName: 'ongs',
          referencedColumnNames: ['id'],
        }),
      );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ongsNotifications');
  }
}
