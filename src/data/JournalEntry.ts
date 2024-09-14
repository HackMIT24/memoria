export class JournalEntry {
	id: string;
	userId: string;
	title: string;
	date: Date;
	content: string;

	constructor(id: string, userId: string, title: string, date: Date, content: string) {
		this.id = id;
		this.userId = userId;
		this.title = title;
		this.date = date;
		this.content = content;
	}
}