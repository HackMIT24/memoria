'use client'

// JournalForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {useMutation} from "convex/react";
import {api} from "../../../../../convex/_generated/api";

// Define validation schema using Zod
const journalSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	content: z.string().min(1, { message: 'Content is required' }),
});

// Define the form data types
type JournalFormData = z.infer<typeof journalSchema>;

const JournalForm: React.FC = () => {
	const form = useForm<JournalFormData>({
		resolver: zodResolver(journalSchema),
	});
	const create = useMutation(api.journal.createEntry);

	// Handler when form is submitted
	const onSubmit = (data: JournalFormData) => {
		const formData = {
			title: data.title,
			content: data.content,
			date: new Date().toLocaleDateString(),
		}
		console.log("I was called!")
		const id = create(formData);

	};

	return (
		<div className={'flex flex-col'}>
			<Form {...form} onSubmit={onSubmit} className="space-y-6 w-max">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className={'mb-3'}>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Enter journal title" {...field} />
							</FormControl>
							<FormMessage>{form.formState.errors.title?.message}</FormMessage>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem className={'mb-3'}>
							<FormLabel>Content</FormLabel>
							<FormControl>
								<Textarea placeholder="Write your journal entry" rows={6} {...field} />
							</FormControl>
							<FormMessage>{form.formState.errors.content?.message}</FormMessage>
						</FormItem>
					)}
				/>

				<Button type="submit">Submit</Button>
			</Form>
		</div>
	);
};

export default JournalForm;
