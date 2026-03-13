-- CreateTable
CREATE TABLE "exame" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_exame" TIMESTAMP(3) NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "resultado" TEXT NOT NULL,

    CONSTRAINT "exame_pkey" PRIMARY KEY ("id")
);
