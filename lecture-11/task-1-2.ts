const util = require("util");

enum TaskStatus {
    TO_DO,
    IN_PROCESS,
    QA,
    DONE
};

interface Task {
    text: string,
    status: TaskStatus
};

interface Member {
    type: string,
    name: string,
    tasks: Map<string, Task>
};

const teamMembers = new Map<number, Member>();

class TeamMember {
    memberId: number;

    constructor(member: Member) {
        const memberId = teamMembers.size + 1;
       
        this.memberId = memberId; 
       
        teamMembers.set(memberId, member);
    };

    getRandomTaskId(taskText: string): string {
        function hashCode(text: string): string {
            let h = 0;
            
            for(let i = 0; i < text.length; i++) 
                  h = Math.imul(31, h) + text.charCodeAt(i) | 0;
        
            return String(h);
        }

        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1) + hashCode(taskText);
    };

    createTask(createFor: number, taskText: string): string | void {
        const member = teamMembers.get(createFor);

        if (member) {
            const memberTasks = member["tasks"];

            const taskId = this.getRandomTaskId(taskText);
    
            memberTasks.set(taskId, {text: taskText, status: TaskStatus.TO_DO});
    
            member.tasks = memberTasks;
    
            teamMembers.set(createFor, member);
    
            return taskId;
        };
    };

    startTask(taskId: string): boolean {
        const member = teamMembers.get(this.memberId);

        if (member) {
            const memberTasks = member.tasks;

            const task = memberTasks.get(taskId);

            if (task) {
                task.status = TaskStatus.IN_PROCESS;

                memberTasks.set(taskId, task);

                member.tasks = memberTasks;

                return true;
            };
        };

        return false;
    };

    testTask(qaId: number, taskId: string): boolean {
        const qa = teamMembers.get(qaId);

        const qaTasks = qa?.tasks;

        const member = teamMembers.get(this.memberId);

        const memberTasks = member?.tasks;

        const task = memberTasks?.get(taskId);

        if (task) {
            task.status = TaskStatus.QA;

            qaTasks?.set(taskId, task);

            memberTasks?.delete(taskId);

            return true;
        };

        return false
    };

    doneTask(taskId: string) {
        const member = teamMembers.get(this.memberId);

        const memberTasks = member?.tasks;

        const task = memberTasks?.get(taskId);

        if (task) {
            task.status = TaskStatus.DONE;

            return true;
        };

        return false;
    };
};

const businessAnalyst = new TeamMember({
    type: "business analyst",
    name: "Oleksandr",
    tasks: new Map(),
});

const projectManager = new TeamMember({
    type: "project manager",
    name: "Vlad",
    tasks: new Map(),
});

const backendDeveloper = new TeamMember({
    type: "backend developer", 
    name: "Nazarii", 
    tasks: new Map()
});

const frontendDeveloper = new TeamMember({
    type: "frontend developer",
    name: "Dima",
    tasks: new Map(),
});

const devopsDeveloper = new TeamMember({
    type: "devops developer",
    name: "Anatolyi",
    tasks: new Map(),
});

const qualityAssurance = new TeamMember({
    type: "quality assurance",
    name: "Oleg",
    tasks: new Map(),
});

const businessTaskId = businessAnalyst.createTask(businessAnalyst.memberId, "Проаналізувати вимоги та потреби замовника.");

if (businessTaskId) {
    businessAnalyst.startTask(businessTaskId);
    businessAnalyst.doneTask(businessTaskId);
};

const pmTaskId = businessAnalyst.createTask(projectManager.memberId, "На основі аналізу вимог та потреб створити роадмап за тадачі на технічну частину команди.");
if (pmTaskId) {
    projectManager.startTask(pmTaskId);

    const backendTaskId = projectManager.createTask(backendDeveloper.memberId, "Написати бекендну частину для проекту.");
    const frontendTaskId = projectManager.createTask(frontendDeveloper.memberId, "Написати UI частину для проекту.");
    const devopsTaskId = projectManager.createTask(devopsDeveloper.memberId, "Налаштувати сервери та процес CI/CD для заливки проекту.");

    projectManager.doneTask(pmTaskId);

    if (backendTaskId) {
        backendDeveloper.startTask(backendTaskId);
        backendDeveloper.doneTask(backendTaskId);
        backendDeveloper.testTask(qualityAssurance.memberId, backendTaskId);

        qualityAssurance.startTask(backendTaskId);
        qualityAssurance.doneTask(backendTaskId);
    };

    if (frontendTaskId) {
        frontendDeveloper.startTask(frontendTaskId);
        frontendDeveloper.doneTask(frontendTaskId);
        frontendDeveloper.testTask(qualityAssurance.memberId, frontendTaskId);

        qualityAssurance.startTask(frontendTaskId);
        qualityAssurance.doneTask(frontendTaskId);
    };

    if (devopsTaskId) {
        devopsDeveloper.startTask(devopsTaskId);
        devopsDeveloper.doneTask(devopsTaskId);
        devopsDeveloper.testTask(qualityAssurance.memberId, devopsTaskId);

        qualityAssurance.startTask(devopsTaskId);
        qualityAssurance.doneTask(devopsTaskId);
    };
};

console.log(util.inspect(teamMembers, {showHidden: false, depth: null, colors: true}));