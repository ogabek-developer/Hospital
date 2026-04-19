-- CreateTable
CREATE TABLE "Admins" (
    "id" SERIAL NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_super_admin" BOOLEAN NOT NULL DEFAULT false,
    "hospital_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctors" (
    "id" SERIAL NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "hospital_id" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hospitals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hospitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Potients" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "hospital_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Potients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hospital_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questionnaires" (
    "id" SERIAL NOT NULL,
    "hospital_id" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Questionnaires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "questionnaire_id" INTEGER NOT NULL,
    "question_text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answers" (
    "id" SERIAL NOT NULL,
    "hospital_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "potient_id" INTEGER NOT NULL,
    "answer_text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admins_id_key" ON "Admins"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_phone_number_key" ON "Admins"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Doctors_id_key" ON "Doctors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Doctors_phone_number_key" ON "Doctors"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Hospitals_id_key" ON "Hospitals"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Hospitals_phone_key" ON "Hospitals"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Potients_id_key" ON "Potients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Potients_full_name_hospital_id_key" ON "Potients"("full_name", "hospital_id");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_id_key" ON "Departments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_name_hospital_id_key" ON "Departments"("name", "hospital_id");

-- CreateIndex
CREATE UNIQUE INDEX "Questionnaires_id_key" ON "Questionnaires"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Questionnaires_hospital_id_department_id_key" ON "Questionnaires"("hospital_id", "department_id");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_id_key" ON "Questions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_questionnaire_id_question_text_key" ON "Questions"("questionnaire_id", "question_text");

-- CreateIndex
CREATE UNIQUE INDEX "Answers_hospital_id_question_id_potient_id_key" ON "Answers"("hospital_id", "question_id", "potient_id");

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospitals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctors" ADD CONSTRAINT "Doctors_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctors" ADD CONSTRAINT "Doctors_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Potients" ADD CONSTRAINT "Potients_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departments" ADD CONSTRAINT "Departments_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questionnaires" ADD CONSTRAINT "Questionnaires_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questionnaires" ADD CONSTRAINT "Questionnaires_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_questionnaire_id_fkey" FOREIGN KEY ("questionnaire_id") REFERENCES "Questionnaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_potient_id_fkey" FOREIGN KEY ("potient_id") REFERENCES "Potients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
