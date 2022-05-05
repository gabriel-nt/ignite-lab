import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Course } from './course';
import { Student } from './student';

@ObjectType()
export class Enrollment {
  @Field(() => ID)
  id: string;

  @Field(() => Student)
  student: Student;

  studentId: string;

  @Field(() => Course)
  course: Student;

  courseId: string;

  @Field(() => Date, { nullable: true })
  canceleddAt: Date;

  @Field(() => Date)
  createdAt: Date;
}
