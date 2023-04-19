/* eslint-disable no-eval */
import GeneralService from 'app_services/general/general';

class ProblemsGameService {
  private answer: number = 0;
  private question: string = '';
  private options: string[] | number[] = [];

  private level: number = 0;
  private parentheses: boolean = false;
  private terms: number = 3;
  private operators: string[] = [];

  public static isInt = (n: number) => {
    return Number(n) === n && n % 1 === 0;
  };

  public static isFloat = (n: number) => {
    return Number(n) === n && n % 1 !== 0;
  };

  public static randomNumberRange = (min: number, max: number): number => {
    let option: number = Math.floor(Math.random() * (max - min) + min);

    return option;
  };

  private randomOperator = (): string => {
    const operatorsLength = this.operators.length - 1;
    const operatorIndex = ProblemsGameService.randomNumberRange(
      0,
      operatorsLength,
    );
    const operator = this.operators[operatorIndex];

    return operator;
  };

  private randomOption = (answer:number): number => {
    const operators = ['+', '-'];
    const operatorIndex = ProblemsGameService.randomNumberRange(
      0,
      operators.length - 1,
    );
    const randomOperator = operators[operatorIndex];

    let randomNumber=0;
    let option=answer
    while(option===answer){
      randomNumber = ProblemsGameService.randomNumberRange(2, 5);
      option = eval(`${answer} ${randomOperator} ${randomNumber}`);
    }
    

    if (ProblemsGameService.isFloat(option)) {
      return Number(option.toFixed(2));
    }

    return option;
  };

  private generateOptions = (): number[] => {
    let optionA= this.randomOption(this.answer)
    let optionB= this.randomOption(optionA)
    return GeneralService.shuffle([
      this.answer,
      optionA,
      optionB,
    ]);
  };

  private treeNode = (left: any, right: any, operator: string): string => {
    if (this.parentheses) {
      return `(${left} ${operator} ${right})`;
    }

    return `${left} ${operator} ${right}`;
  };

  private buildTree = (numNodes: number): string => {
    if (numNodes === 1) {
      return ProblemsGameService.randomNumberRange(1, 20).toString();
    }

    const numLeft = Math.floor(numNodes / 2);
    const leftSubTree: any = this.buildTree(numLeft);

    const numRight = Math.ceil(numNodes / 2);
    const rightSubTree: any = this.buildTree(numRight);

    const operator = this.randomOperator();

    return this.treeNode(leftSubTree, rightSubTree, operator);
  };

  private setlevel = (level: number = 1): void => {
    this.level = level;

    if (this.level >= 0 && this.level < 5) {
      this.terms = 2;
      this.parentheses = false;
      this.operators = ['+', '-'];
    } else if (this.level >= 5 && this.level < 10) {
      this.terms = 3;
      this.parentheses = true;
      this.operators = ['+', '-', '*'];
    } else if (this.level >= 10) {
      this.terms = 4;
      this.parentheses = true;
      this.operators = ['+', '-', '*', '/'];
    }
  };

  public generate = (level: number = 0) => {
    this.setlevel(level);

    this.question = this.buildTree(this.terms);
    let answer = eval(this.question);

    if (ProblemsGameService.isFloat(answer)) {
      answer = Number(answer.toFixed(2));
    }

    this.answer = answer;
    this.options = this.generateOptions();

    return {
      question: this.question,
      answer: this.answer,
      options: this.options,
    };
  };
}

export default ProblemsGameService;
