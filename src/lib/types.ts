import { DEPARTMENTS } from './constants';

export type Student = {
	'Faculty Name': string;
	'Dept.Stream': string;
	AcYear: string;
	Year: number;
	'Student ID': string;
	'First Name': string;
	'Father Name': string;
	'GFather Name': string;
	Gender: string;
	Block: string;
	Dorm: string;
	email?: string;
};

export type StudentsJSON = {
	[department: string]: Student[];
};

export type DepartmentIdType = keyof typeof DEPARTMENTS;
