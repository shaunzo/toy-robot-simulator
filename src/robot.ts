import { DirectionDto } from './direction';
import { commandTypesDto } from './commands';
import { Table } from './table';
import { RobotMessages } from './robot-messages';

export interface RobotPosition {
    x?: number;
    y?: number;
    facing?: DirectionDto.DirectionTypeEnum
}

export class Robot {
    constructor(){
    }

    public moveCount: number = 0;
    public position: RobotPosition = {x:0, y:0, facing: 'NORTH'};

    /**
     * 
     * @param command The command to execute PLACE, MOVE, RIGHT, LEFT or REPORT
     * @param x The x position entered
     * @param y The y position entered
     * @param facing The direction that the roboto is to face NORTH, SOUTH, EAST or WEST
     * @param table The table this robot is moving on
     */
    execute(
        command: commandTypesDto.TypeEnum,
        table?: Table,
        x:number = 0,
        y:number = 0,
        facing?: DirectionDto.DirectionTypeEnum,
        printReportFn = RobotMessages.printReport) {
        

        if(!table && (command === 'PLACE' || command === 'MOVE')) return;

        if(table) {
            if(command === 'PLACE' && facing) {
                this.place([x,y], facing, table);
            }

            if(command === 'MOVE') {
                this.move(table);
            }
        }

        if(command === 'LEFT') {
            this.left();
        }

        if(command === 'RIGHT') {
            this.right();
        }

        if(command === 'REPORT') {
            if(this.moveCount === 0) {
                RobotMessages.requirePlaceCommand();
                return;
            } else {
                // RobotMessages.printReport((this.position.x), (this.position.y), (this.position.facing))
                printReportFn(this.position.x, this.position.y, this.position.facing);
                return;
            }

        }
    }

    private place(position: number[], facing: DirectionDto.DirectionTypeEnum, table: Table) {
        if(table.isPositionValid(position)) {
            this.position.x = position[0];
            this.position.y = position[1];
            this.position.facing = facing;
            this.moveCount++;
            RobotMessages.afterExecute();
        } else {
            return
        }

    }

    private left() {
        if(this.moveCount > 0) {
            switch (this.position.facing) {
                case 'NORTH':
                    this.position.facing = DirectionDto.DirectionTypeEnum.WEST;
                    break;
                case 'SOUTH':
                    this.position.facing = DirectionDto.DirectionTypeEnum.EAST;
                    break;
                case 'EAST':
                    this.position.facing = DirectionDto.DirectionTypeEnum.NORTH;
                    break;
                case 'WEST':
                    this.position.facing = DirectionDto.DirectionTypeEnum.SOUTH;
                default:
                    break;
            }
    
            this.moveCount++;
            RobotMessages.afterExecute();
        } else {
            RobotMessages.requirePlaceCommand();
            return;
        }
    }

    private right() {
        if(this.moveCount > 0) {
            switch (this.position.facing) {
                case 'NORTH':
                    this.position.facing = DirectionDto.DirectionTypeEnum.EAST;
                    break;
                case 'SOUTH':
                    this.position.facing = DirectionDto.DirectionTypeEnum.WEST;
                    break;
                case 'EAST':
                    this.position.facing = DirectionDto.DirectionTypeEnum.SOUTH;
                    break;
                case 'WEST':
                    this.position.facing = DirectionDto.DirectionTypeEnum.NORTH;
                default:
                    break;
            }
    
            this.moveCount++;
            RobotMessages.afterExecute();
        } else {
            RobotMessages.requirePlaceCommand();
            return;
        }
    }

    private move(table: Table) {
        let hasMoved = false;
        
        if(this.moveCount > 0) {
            
                    if((this.position.y !== undefined) && (this.position.x !== undefined)) {
                        const up = this.position.y + 1;
                        const down = this.position.y - 1;
                        const right = this.position.x + 1;
                        const left = this.position.x - 1;

                        let newXPos = 0;
                        let newYPos = 0;
            
                        switch (this.position.facing) {
                            case 'NORTH':
                                newYPos = this.position.y + 1;
                                if(table.isPositionValid([this.position.x, newYPos])) {
                                    this.position.y++;
                                    hasMoved = true;
                                } 
                                break;
                            case 'SOUTH':
                                newYPos = this.position.y - 1;
                                if(table.isPositionValid([this.position.x, newYPos])) {
                                    this.position.y--;
                                    hasMoved = true;
                                }
                                break;
                            case 'EAST':
                                newXPos = this.position.x + 1;
                                if(table.isPositionValid([newXPos, this.position.y])) {
                                    this.position.x++;
                                    hasMoved = true;
                                }
                                break;
                            case 'WEST':
                                newXPos = this.position.x - 1;
                                if(table.isPositionValid([newXPos, this.position.x])) {
                                    this.position.x--;
                                    hasMoved = true;
                                }
                                break;
                            default:
                                break;
                        }
            
                        if(hasMoved) {
                            this.moveCount++;
                            RobotMessages.afterExecute();
                        }
            
                    } else {
                        return
                    }
        } else {
            RobotMessages.requirePlaceCommand();
        }

    }
}