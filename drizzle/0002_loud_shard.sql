PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`department` text NOT NULL,
	`student_id` text NOT NULL,
	`block` text NOT NULL,
	`dorm` text NOT NULL,
	`student_email` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user_profiles`("id", "department", "student_id", "block", "dorm", "student_email") SELECT "id", "department", "student_id", "block", "dorm", "student_email" FROM `user_profiles`;--> statement-breakpoint
DROP TABLE `user_profiles`;--> statement-breakpoint
ALTER TABLE `__new_user_profiles` RENAME TO `user_profiles`;--> statement-breakpoint
PRAGMA foreign_keys=ON;