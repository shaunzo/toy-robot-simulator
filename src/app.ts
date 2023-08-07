#!/usr/bin/env node

import { RobotMessages} from './robot-messages';
import { Robot } from './robot';
import { Table } from './table';
import { handler } from './commands';

export const initialise = () => {
  let stdin = process.openStdin();
  const robot = new Robot();
  const table = new Table(5);

  stdin.addListener('data', (d) => {
    handler(d, robot, table, null);
  } )
}

/**
 * Initialise app
 */
const start = () => {
  RobotMessages.showTitle();
  RobotMessages.showDescription();
  initialise();
}

start();