import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from '../../http/services/courses.service';
import { EnrollmentsService } from '../../http/services/enrollments.service';
import { StudentsService } from '../../http/services/students.service';

interface PurchaseCreatedPayload {
  customer: {
    authUserId: string;
  };
  product: {
    id: string;
    title: string;
    slug: string;
  };
}

@Controller()
export class PurchaseController {
  constructor(
    private studentService: StudentsService,
    private courseService: CoursesService,
    private enrollmentService: EnrollmentsService,
  ) {}

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    let student = await this.studentService.getStudentByAuthUserId(
      payload.customer.authUserId,
    );

    if (!student) {
      student = await this.studentService.create({
        authUserId: payload.customer.authUserId,
      });
    }

    let course = await this.courseService.getCourseBySlug(payload.product.slug);

    console.log(course);

    if (!course) {
      course = await this.courseService.createCourse({
        title: payload.product.title,
      });
    }

    await this.enrollmentService.createEnrollment({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
