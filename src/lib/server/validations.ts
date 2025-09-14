import type { DepartmentIdType } from '@/types';
import students from '$lib/data/students.json';
export function validateStudentProfile({
	studentEmail,
	studentId,
	block,
	dorm,
	department
}: {
	studentEmail: string;
	studentId: string;
	block: string;
	dorm: string;
	department: DepartmentIdType;
}): boolean {
	const deptStudents = students[department];
	if (!deptStudents) return false;

	// normalize email
	const normalized = studentEmail.trim().toLowerCase();

	const student = deptStudents.find((s) => s['Student ID'] === studentId);
	if (!student) {
		return false;
	}

	const expectedEmail = `${student['First Name'].toLowerCase()}.${student['Father Name'].toLowerCase()}@aastustudent.edu.et`;

	return (
		expectedEmail === normalized &&
		student.Block.toLowerCase() == block.toLocaleLowerCase() &&
		student.Dorm.toLowerCase() == dorm.toLowerCase()
	);
}
