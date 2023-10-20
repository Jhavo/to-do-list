import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const salt = Number(process.env.ROUNDS_OF_HASHING);

    const role1 = await prisma.role.upsert({
        where: { role: 'Adviser' },
        update: {},
        create: {
            role: 'Adviser',
            hierarchy: 1,
        },
    });

    const role2 = await prisma.role.upsert({
        where: { role: 'Supervisor' },
        update: {},
        create: {
            role: 'Supervisor',
            hierarchy: 2,
        },
    });

    const role3 = await prisma.role.upsert({
        where: { role: 'Chief' },
        update: {},
        create: {
            role: 'Chief',
            hierarchy: 3,
        },
    });

    const role4 = await prisma.role.upsert({
        where: { role: 'Manager' },
        update: {},
        create: {
            role: 'Manager',
            hierarchy: 4,
        },
    });

    const user1 = await prisma.user.upsert({
        where: { username: 'supervisor1' },
        update: {
            roleId: role2.id,
        },
        create: {
            name: 'First Super Menganito De Tal',
            username: 'supervisor1',
            password: await bcrypt.hash('supervisor1', salt),
            roleId: role2.id,
        },
    });

    const user2 = await prisma.user.upsert({
        where: { username: 'adviser1' },
        update: {
            roleId: role1.id,
        },
        create: {
            name: 'First Adviser Fulanito De Tal',
            username: 'adviser1',
            password: await bcrypt.hash('adviser1', salt),
            superior: 1,
            roleId: role1.id,
        },
    });

    const user3 = await prisma.user.upsert({
        where: { username: 'adviser2' },
        update: {
            roleId: role1.id,
        },
        create: {
            name: 'Second Adviser Sultanito De Tal',
            username: 'adviser2',
            password: await bcrypt.hash('adviser2', salt),
            superior: 1,
            roleId: role1.id,
        },
    });

    const task1 = await prisma.task.upsert({
        where: { title: 'Sell 5 cell phones' },
        update: {
            assignedTo: user2.id,
        },
        create: {
            title: 'Sell 5 cell phones',
            assignedTo: user2.id,
            status: 'T',
            dueDate: '2023-10-18'
        },
    });

    const task2 = await prisma.task.upsert({
        where: { title: 'Sell 10 cell phones' },
        update: {
            assignedTo: user2.id,
        },
        create: {
            title: 'Sell 10 cell phones',
            assignedTo: user2.id,
            status: 'P',
            dueDate: '2023-10-19'
        },
    });

    const task3 = await prisma.task.upsert({
        where: { title: 'Sell 15 cell phones' },
        update: {
            assignedTo: user2.id,
        },
        create: {
            title: 'Sell 15 cell phones',
            assignedTo: user2.id,
            status: 'IP',
            dueDate: '2023-10-20'
        },
    });

    const task4 = await prisma.task.upsert({
        where: { title: 'Sell 5 smartwaches' },
        update: {
            assignedTo: user3.id,
        },
        create: {
            title: 'Sell 5 smartwaches',
            assignedTo: user3.id,
            status: 'P',
            dueDate: '2023-10-18'
        },
    });

    const task5 = await prisma.task.upsert({
        where: { title: 'Sell 10 smartwaches' },
        update: {
            assignedTo: user3.id,
        },
        create: {
            title: 'Sell 10 smartwaches',
            assignedTo: user3.id,
            status: 'IP',
            dueDate: '2023-10-19'
        },
    });

    const task6 = await prisma.task.upsert({
        where: { title: 'Sell 15 smartwaches' },
        update: {
            assignedTo: user3.id,
        },
        create: {
            title: 'Sell 15 smartwaches',
            assignedTo: user3.id,
            status: 'P',
            dueDate: '2023-10-20'
        },
    });

    console.log({ role1, role2, role3, role4, user1, user2, user3, task1, task2, task3, task4, task5, task6 });
}

main()
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});
