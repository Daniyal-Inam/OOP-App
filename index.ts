#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

class Student {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
}

class Person {
  students: Student[] = [];

  addStudent(obj: Student) {
    this.students.push(obj);
  }
}

const persons = new Person();

const programStart = async (persons: Person) => {
  console.log(chalk.bold.italic.yellow("\nWelcome guest\n"));
  do {
    const ans = await inquirer.prompt({
      name: "select",
      message: chalk.cyan("What do you want to do?"),
      type: "list",
      choices: ["Self", "Student", "Exit"],
    });

    if(ans.select === "Exit"){
        console.log(chalk.bold.italic.green("\nThank you for visiting...."));
        break;
    };

    if (ans.select === "Self") {
      console.log(chalk.blue.bold.italic("\nHello, I am talking to myself."));
      console.log(chalk.blue.bold.italic("I am feeling well; I am a cheerful person.\n"));
    }
    if (ans.select === "Student") {
      const ans = await inquirer.prompt({
        name: "student",
        message: chalk.cyan("Who do you want to talk to among the students?:"),
        type: "input",
      });

      const student = persons.students.find((val) => val.name === ans.student);

      if (!student) {
        const name = new Student(ans.student);
        persons.addStudent(name);
        console.log(chalk.green.bold(`\nHello, I am ${name.name} and I am fine.`));
        console.log(persons.students);
      }

      if (student) {
        console.log(chalk.green.bold(`Hello, I am ${student.name} and I am fine....`));
        console.log(persons.students);
      }
    }
  } while (true);
};
programStart(persons);