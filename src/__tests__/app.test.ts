import * as fs from 'fs';
import * as path from 'path';
import { Robot } from '../robot';
import { Table } from '../table';
import { handler } from '../commands';

const testCommandsFile_around_board = path.join(__dirname, 'test-commands.txt');
const testCommandsFile_invalid_initial_commands = path.join(__dirname, 'test-invalid-initial-commands.txt');

test('Test REPORT output moving around table without falling off', () => {
  const testCommands = fs.readFileSync(testCommandsFile_around_board, 'utf-8').trim().split('\n');
  const robot = new Robot();
  const table = new Table(5);

  const consoleLogSpy = jest.spyOn(console, 'log'); // Create a spy on console.log

  // Simulate user input for each test command
  testCommands.forEach((testCommand: string) => {
    const mockStdin = {
      addListener: (_: string, callback: (data: string) => void) => {
        // Simulate user input by passing the testCommand as a string
        callback(testCommand);
      },
    };

    // Call the handler function to trigger the event listener
    handler(testCommand, robot, table, mockStdin);
  });

  // Assert the console.log output against the expected output for the REPORT command
  const lastCommandOutput = testCommands[testCommands.length - 1];
  const [lastCommand, expectedOutput] = lastCommandOutput.split(';');
  expect(consoleLogSpy.mock.calls[consoleLogSpy.mock.calls.length - 1][0].trim()).toContain(expectedOutput.trim());

  // Restore the original console.log
  consoleLogSpy.mockRestore();
});

test('Test invalid initial commands whereby PLACE is not executed first', () => {
    const testCommands = fs.readFileSync(testCommandsFile_invalid_initial_commands, 'utf-8').trim().split('\n');
    const robot = new Robot();
    const table = new Table(5);
  
    const consoleLogSpy = jest.spyOn(console, 'log'); // Create a spy on console.log
  
    // Simulate user input for each test command
    testCommands.forEach((testCommand: string) => {
      const mockStdin = {
        addListener: (_: string, callback: (data: string) => void) => {
          // Simulate user input by passing the testCommand as a string
          callback(testCommand);
        },
      };
  
      // Call the handler function to trigger the event listener
      handler(testCommand, robot, table, mockStdin);
    });
  
    // Assert the console.log output against the expected output for the REPORT command
    const lastCommandOutput = testCommands[testCommands.length - 1];
    const [lastCommand, expectedOutput] = lastCommandOutput.split(';');
    consoleLogSpy.mock.calls.forEach(res => {
        expect(res[0]).toContain(expectedOutput);
    })
  
    // Restore the original console.log
    consoleLogSpy.mockRestore();
  });
