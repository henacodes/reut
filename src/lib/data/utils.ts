import students from '$lib/data/students.json';
import type { DepartmentIdType, Student } from '$lib/types';

export function getStudent(departmentId: DepartmentIdType, studentId: string) {
	const deptStudents = students[departmentId];
	if (!deptStudents) return null;

	const student = deptStudents.find((s) => s['Student ID'] === studentId.toUpperCase());
	if (!student) return null;

	// Compute university email
	const firstName = student['First Name'].trim().toLowerCase();
	const fatherName = student['Father Name'].trim().toLowerCase();
	let email = `${firstName}.${fatherName}@aastustudent.edu.et`;

	return { ...student, email };
}
