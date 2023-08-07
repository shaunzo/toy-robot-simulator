import Chalk from "chalk";
import figlet from "figlet";

export namespace RobotMessages {

    export const requirePlaceCommand = () => {
        console.log(
            Chalk.redBright('Cannot execute, first command needs to be a PLACE command eg. PLACE 0,1,EAST')
        )
    }

    export const noXY = () => {
        console.log(
            Chalk.redBright('Cannot execut PLACE command with XY co-ordinates eg. PLACE 0,1,EAST')
        )
    }

    export const afterExecute = () => {
        console.log(
            Chalk.greenBright('Done!, Ready for next command...')
        )
    }

    export const invalidCommand = () => {
        console.log(
            Chalk.redBright('Invalid Command!')
        )
    }

    export const printReport = (x: any, y: any, facing: any) => {
       console.log(
            Chalk.blueBright(`${x},${y},${facing}`)
        );
    }

    export const showTitle = () => {
        console.log(
            Chalk.yellowBright(
                figlet.textSync('Toy Robot', {
                        font: '4Max',
                        horizontalLayout: 'default',
                        verticalLayout: 'default'
                    }
                )
            )
        )
    };

    export const showDescription = () => {
        console.log(
            Chalk.white('\nAvailable commands:\n')
        )

        console.log(
            Chalk.cyan('PLACE 2,3,NORTH, SOUTH, EAST or WEST\nLEFT\nRIGHT\nMOVE\nREPORT\n')
        )

        console.log(
            Chalk.cyan('To close this program, press CTRL+C on your keyboard\n')
        );

        console.log(
            Chalk.bgGray('Start typing your commands below (Remember to start with a PLACE command):\n')
        );
    }
}