export default class QuestionParser {
    static parse(content) {
        const questions = [];
        const regex = /### 问题[\s\S]*?(?=### 问题|$)/g;
        const matches = content.match(regex);

        if (!matches) return questions;

        matches.forEach(match => {
            const question = this.parseQuestion(match);
            if (question) questions.push(question);
        });

        return questions;
    }

    static parseQuestion(text) {
        const titleMatch = text.match(/### (.+)/);
        const knowledgeMatch = text.match(/\*\*知识点：\*\*\s*(.+)/);
        const questionMatch = text.match(/\*\*题目：\*\*\s*(.+)/);
        const optionsMatch = text.match(/[A-D]\)\s*.+/g);
        const answerMatch = text.match(/\*\*正确答案：\*\*\s*(.+)/);
        const referenceMatch = text.match(/\*\*原文依据：\*\*\s*(.+)/);
        const explanationMatch = text.match(/\*\*解析：\*\*\s*(.+)/);

        if (!titleMatch || !questionMatch || !optionsMatch || !answerMatch) return null;

        return {
            title: titleMatch[1],
            knowledgePoint: knowledgeMatch ? knowledgeMatch[1] : '',
            questionText: questionMatch[1],
            options: optionsMatch.map(opt => opt.replace(/^[A-D]\)\s*/, '')),
            correctAnswer: answerMatch[1].trim(),
            reference: referenceMatch ? referenceMatch[1] : '',
            explanation: explanationMatch ? explanationMatch[1] : ''
        };
    }
} 