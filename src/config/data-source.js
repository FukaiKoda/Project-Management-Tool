import { DataSource } from 'typeorm'
import { POSTGRES_URL, POSTGRES_PASS } from './env.js'
import pkg from 'pg-connection-string';
const { parse } = pkg;

import User from '../entities/user.entity.ts';
import Workspace from '../entities/workspace.entity.ts';
import Board from '../entities/board.entity.ts';
import List from '../entities/list.entity.ts';
import Card from '../entities/card.entity.ts';
import WorkspaceMember from '../entities/workspaceMember.entity.ts';

const dbConfig = parse(POSTGRES_URL);

const AppDataSource = new DataSource({
    type: 'postgres',
    host: dbConfig.host,
    port: parseInt(dbConfig.port),
    username: dbConfig.user,
    password: POSTGRES_PASS,
    database: dbConfig.database,
    synchronize: true,
    logging: false,
    entities: [User, WorkspaceMember, Workspace, Board, List, Card],
    subscribers: [],
    migrations: [],
})

export default AppDataSource