import { Request, Response } from "express";
import Question from "../models/Question";

function getUserId(req: any): string | null {
  return req.userId || null;
}

export async function listQuestions(req: Request, res: Response) {
  try {
    const { sort = "recent" } = req.query as any;
    const sortSpec = sort === "upvoted"
      ? ([ ["answers.upvotes", -1] as [string, 1 | -1], ["updatedAt", -1] as [string, 1 | -1] ])
      : ([ ["createdAt", -1] as [string, 1 | -1] ]);
    const questions = await Question.find()
      .populate("author", "name email")
      .sort(sortSpec)
      .limit(50);
    // Sort answers within each question by upvotes desc, accepted first, then upvotes
    const shaped = questions.map((q: any) => {
      const base: any = q.toObject();
      let answers: any[] = [...(base.answers || [])].sort((a: any, b: any) => {
        if (a.isAccepted && !b.isAccepted) return -1;
        if (!a.isAccepted && b.isAccepted) return 1;
        return (b.upvotes || 0) - (a.upvotes || 0);
      });
      // Return all answers - let frontend handle filtering
      base.answers = answers;
      return base;
    });
    res.json({ questions: shaped });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch questions" });
  }
}

export async function createQuestion(req: Request & any, res: Response) {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const { title, description, category } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const q = await Question.create({ author: userId, title, description, category: category || "General" });
    res.status(201).json({ question: q });
  } catch (err) {
    res.status(500).json({ message: "Failed to create question" });
  }
}

export async function addAnswer(req: Request & any, res: Response) {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const { id } = req.params;
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required" });
    const updated = await Question.findByIdAndUpdate(
      id,
      { $push: { answers: { author: userId, content, upvotes: 0, upvotedBy: [], isAccepted: false } } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Question not found" });
    res.json({ question: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to add answer" });
  }
}

export async function upvoteAnswer(req: Request & any, res: Response) {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const { id, answerId } = req.params as any;
    const q = await Question.findById(id);
    if (!q) return res.status(404).json({ message: "Question not found" });
    const ans = q.answers.id(answerId) as any;
    if (!ans) return res.status(404).json({ message: "Answer not found" });
    // Prevent multiple upvotes by the same user
    const already = (ans.upvotedBy || []).some((u: any) => u.toString() === userId);
    if (already) return res.status(400).json({ message: "Already upvoted" });
    // If user had downvoted, undo it first
    const hadDownvoted = (ans.downvotedBy || []).some((u: any) => u.toString() === userId);
    if (hadDownvoted) {
      ans.downvotedBy = (ans.downvotedBy || []).filter((u: any) => u.toString() !== userId);
      ans.downvotes = Math.max(0, (ans.downvotes || 0) - 1);
    }
    ans.upvotes += 1;
    ans.upvotedBy = [...(ans.upvotedBy || []), userId];
    await q.save();
    res.json({ question: q });
  } catch (err) {
    res.status(500).json({ message: "Failed to upvote" });
  }
}

export async function acceptAnswer(req: Request & any, res: Response) {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const { id, answerId } = req.params as any;
    const q = await Question.findById(id);
    if (!q) return res.status(404).json({ message: "Question not found" });
    if (q.author.toString() !== userId && req.userRole !== "admin") {
      return res.status(403).json({ message: "Only author or admin can accept" });
    }
    q.answers.forEach((a: any) => { a.isAccepted = a._id.toString() === answerId; });
    await q.save();
    // Return all answers - let frontend handle display logic
    res.json({ question: q });
  } catch (err) {
    res.status(500).json({ message: "Failed to accept answer" });
  }
}

export async function downvoteAnswer(req: Request & any, res: Response) {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const { id, answerId } = req.params as any;
    const q = await Question.findById(id);
    if (!q) return res.status(404).json({ message: "Question not found" });
    const ans = q.answers.id(answerId) as any;
    if (!ans) return res.status(404).json({ message: "Answer not found" });
    const already = (ans.downvotedBy || []).some((u: any) => u.toString() === userId);
    if (already) return res.status(400).json({ message: "Already downvoted" });
    // If user had upvoted, undo it
    const hadUpvoted = (ans.upvotedBy || []).some((u: any) => u.toString() === userId);
    if (hadUpvoted) {
      ans.upvotedBy = (ans.upvotedBy || []).filter((u: any) => u.toString() !== userId);
      ans.upvotes = Math.max(0, (ans.upvotes || 0) - 1);
    }
    ans.downvotes = (ans.downvotes || 0) + 1;
    ans.downvotedBy = [...(ans.downvotedBy || []), userId];
    await q.save();
    res.json({ question: q });
  } catch (err) {
    res.status(500).json({ message: "Failed to downvote" });
  }
}


