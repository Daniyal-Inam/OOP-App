#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
class Student {
    name;
    constructor(n) {
        this.name = n;
    }
}
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
const programStart = async (persons) => {
    console.log(chalk.bold.italic.yellowBright("\nWelcome! \n"));
    do {
        const ans = await inquirer.prompt({
            name: "select",
            message: chalk.cyan("Whom would you like to intrect with?"),
            type: "list",
            choices: ["Staff", "Student", "Exit"],
        });
        if (ans.select === "Exit") {
            console.log(chalk.bold.italic.yellowBright("\nThank you for visiting...."));
            break;
        }
        ;
        if (ans.select === "Staff") {
            console.log(chalk.greenBright.bold.italic("\nYou approach the staff room. Please feel free to ask any question.\n"));
        }
        ;
        if (ans.select === "Student") {
            const ans = await inquirer.prompt({
                name: "student",
                message: chalk.bgBlueBright("Enter the student's name you wish to engage with: "),
                type: "input",
            });
            const student = persons.students.find((val) => val.name === ans.student);
            if (!student) {
                const name = new Student(ans.student);
                persons.addStudent(name);
                console.log(chalk.yellowBright.bold.italic(`\nHello, I am ${name.name}. Nice to meet you!\n`));
                console.log(chalk.green.bold("New student added\n"));
                console.log(chalk.green.bold("Current student list: \n"));
                console.log(persons.students);
            }
            if (student) {
                console.log(chalk.yellowBright.bold.italic(`\nHello, I am ${student.name}. Nice to see you again!\n`));
                console.log(chalk.green.bold("Existing student list: \n"));
                console.log(persons.students);
            }
        }
    } while (true);
};
programStart(persons);
