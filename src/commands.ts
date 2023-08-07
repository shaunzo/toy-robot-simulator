import { Robot } from "./robot";
import { Table } from "./table";
import { RobotMessages } from './robot-messages';
import { DirectionDto } from './direction';

export namespace commandTypesDto {
    export type TypeEnum = 'PLACE'|'MOVE'|'LEFT'|'RIGHT'|'REPORT';

    export const TypeEnum = {
        PLACE: 'PLACE' as TypeEnum,
        MOVE:'MOVE' as TypeEnum,
        LEFT: 'LEFT' as TypeEnum,
        RIGHT: 'RIGHT' as TypeEnum,
        REPORT: 'REPORT' as TypeEnum
    }
}

export const handler = (command: string, robot: Robot, table: Table, stdin: any) => {

    // Convert the buffer data to a string
    const commandString = command.toString().trim();

    const moveRegex = /^MOVE\b/;
    const placeRegex = /^PLACE\b/;
    const leftRegex = /^LEFT\b/;
    const rightRegex = /^RIGHT\b/;
    const reportRegex = /^REPORT\b/;

    let commandType: commandTypesDto.TypeEnum;
    let direction: DirectionDto.DirectionTypeEnum;
    let xy: number[] | null;

    /**
     * Handle PLACE command
     */
    if(placeRegex.test(command)) {
        
        const placeFullRegex = /^PLACE\s*\d+\s*,\s*\d+\s*,\s*(NORTH|SOUTH|EAST|WEST)\s*$/i;

        if(placeFullRegex.test(command.toString())) {

            commandType = commandTypesDto.TypeEnum.PLACE;
            xy = extractXYFromPlaceInput(command);
            direction = getDirectionfromInput(command);
    
            if(!xy) {
                RobotMessages.noXY();
                return;
            } else {
                robot.execute(commandType, table, xy[0], xy[1], direction);
                return robot;
            }

        } else {
            RobotMessages.invalidCommand();
            return;
        }

    }

    /**
     * Handle MOVE command
     */
    if(moveRegex.test(command)) {
        commandType = commandTypesDto.TypeEnum.MOVE;
        robot.execute(commandType, table);
        return;
    }

    /**
     * Handle LEFT command
     */
    if(leftRegex.test(command)) {
        commandType = commandTypesDto.TypeEnum.LEFT;
        robot.execute(commandType);
        return;
    }

    /**
     * Handle RIGHT command
     */
    if(rightRegex.test(command)) {
        commandType = commandTypesDto.TypeEnum.RIGHT;
        robot.execute(commandType);
        return;
    }

    /**
     * Handle REPORT command
     */
    if(reportRegex.test(command)) {
        commandType = commandTypesDto.TypeEnum.REPORT;
        robot.execute(commandType);
        return;
    }

    RobotMessages.invalidCommand();
}

export const getDirectionfromInput = (inputString: string):DirectionDto.DirectionTypeEnum => {
    const northRegex = /(?:[^,]+,)\s*(NORTH)\s*$/i;
    const southRegex = /(?:[^,]+,)\s*(SOUTH)\s*$/i;
    const eastRegex = /(?:[^,]+,)\s*(EAST)\s*$/i;
    const westRegex = /(?:[^,]+,)\s*(WEST)\s*$/i;

    if(inputString.toString().match(northRegex)) return DirectionDto.DirectionTypeEnum.NORTH;
    if(inputString.toString().match(southRegex)) return DirectionDto.DirectionTypeEnum.SOUTH;
    if(inputString.toString().match(eastRegex)) return DirectionDto.DirectionTypeEnum.EAST;
    if(inputString.toString().match(westRegex)) return DirectionDto.DirectionTypeEnum.WEST;

   return DirectionDto.DirectionTypeEnum.NORTH;
}

export const extractXYFromPlaceInput = (pattern: string): number[] | null => {
    const regex = /^PLACE\s+(-?\d+),(-?\d+)/i;
    const match = pattern.toString().match(regex);
  
    if (match && match.length === 3) {
      const x = parseInt(match[1], 10);
      const y = parseInt(match[2], 10);
      return [x, y];
    } else {
      return null;
    }
  }