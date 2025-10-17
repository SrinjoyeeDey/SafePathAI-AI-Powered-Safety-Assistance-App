import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import type { FAQ, Question } from "../types/FAQ";
import { defaultCommunityQuestions } from "../constants/defaultQuestions";

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sort, setSort] = useState<"recent" | "upvoted">("recent");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedQuestionCategory, setSelectedQuestionCategory] = useState<string>("All");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAllAnswers, setShowAllAnswers] = useState<{ [key: string]: boolean }>({});
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  useEffect(() => {
    refreshAll();
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [sort]);


  async function refreshAll() {
    const [{ data: f }, { data: q }] = await Promise.all([
      api.get("/faqs"),
      api.get(`/qna?sort=${sort}`),
    ]);
    setFaqs(f.faqs || []);
    setQuestions(q.questions || []);
  } 
  

  async function fetchQuestions() {
    const { data } = await api.get(`/qna?sort=${sort}`);
    const apiQuestions = data.questions || [];
    setQuestions([...defaultCommunityQuestions, ...apiQuestions]);
  } 
    
  

  const CATEGORY_OPTIONS = ["General", "Safety", "App Features", "Permissions", "SOS"] as const;
  const [category, setCategory] = useState<string>("General");

  async function submitQuestion(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    const { data } = await api.post("/qna", { title, description, category });
    setTitle("");
    setDescription("");
    setCategory("General");
    setQuestions((prev) => [data.question, ...prev]);
    
    // Show confetti animation
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }

  async function addAnswer(questionId: string, content: string) {
    if (!content.trim()) return;
    const { data } = await api.post(`/qna/${questionId}/answers`, { content });
    setQuestions((prev) => prev.map(q => q._id === questionId ? data.question : q));
    
    // Check if question has accepted answer
    const question = data.question;
    const hasAcceptedAnswer = question.answers.some((a: any) => a.isAccepted);
    
    if (hasAcceptedAnswer) {
      setNotification({
        message: "Answer added! However, this question already has an accepted answer, so your answer is hidden. The question author can still see and accept it.",
        type: 'info'
      });
    } else {
      setNotification({
        message: "Answer added successfully!",
        type: 'success'
      });
    }
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => setNotification(null), 5000);
  }

  async function upvote(questionId: string, answerId: string) {
    const { data } = await api.post(`/qna/${questionId}/answers/${answerId}/upvote`);
    setQuestions((prev) => prev.map(q => q._id === questionId ? data.question : q));
  }

  async function downvote(questionId: string, answerId: string) {
    const { data } = await api.post(`/qna/${questionId}/answers/${answerId}/downvote`);
    setQuestions((prev) => prev.map(q => q._id === questionId ? data.question : q));
  }

  async function accept(questionId: string, answerId: string) {
    const { data } = await api.post(`/qna/${questionId}/answers/${answerId}/accept`);
    setQuestions((prev) => prev.map(q => q._id === questionId ? data.question : q));
  }

  function toggleShowAllAnswers(questionId: string) {
    setShowAllAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  }

  const faqItems = useMemo(() => {
    const q = search.toLowerCase();
    let list = !q ? faqs : faqs.filter(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
    const seen = new Set<string>();
    return list.filter(f => {
      const key = f.question.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [faqs, search]);

  const questionCategories = useMemo(() => {
    return ["All", "General", "Safety", "App Features", "Permissions", "SOS"];
  }, []);

  const filteredQuestions = useMemo(() => {
    const q = search.toLowerCase();
    return questions.filter(item => {
      const matchesSearch = !q || item.title.toLowerCase().includes(q) || (item.description || "").toLowerCase().includes(q);
      const matchesCategory = selectedQuestionCategory === "All" || (item.category || "General") === selectedQuestionCategory;
      return matchesSearch && matchesCategory;
    });
  }, [questions, search, selectedQuestionCategory]);

  return (
    <>
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-100 border border-green-400 text-green-800' :
          notification.type === 'info' ? 'bg-blue-100 border border-blue-400 text-blue-800' :
          'bg-yellow-100 border border-yellow-400 text-yellow-800'
        }`}>
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium">{notification.message}</p>
            <button 
              onClick={() => setNotification(null)}
              className="ml-2 text-lg leading-none hover:opacity-70"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <section className="mt-16 pt-8">
        {/* Centered Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-3">
            <span className="text-gray-800 dark:text-white">Frequently Asked </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
            Get answers to common questions about SafePathAI
          </p>
        </div>

        
        <div className="flex justify-center mb-8">
          <input 
            value={search} 
            onChange={(e)=>setSearch(e.target.value)} 
            placeholder="Search questions..." 
            className="w-full max-w-2xl p-3 rounded-lg border dark:bg-gray-900/50 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 outline-none transition" 
          />
        </div>

        
        <div className="max-w-4xl mx-auto space-y-3">
          {faqItems.map((item) => (
            <details key={item._id} className="group bg-white/60 dark:bg-gray-800/60 rounded-xl p-5 border border-white/40 dark:border-gray-700/40 transition hover:shadow-lg">
              <summary className="cursor-pointer font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between">
                <span className="text-base sm:text-lg">{item.question}</span>
                <span className="text-gray-500 dark:text-gray-400 text-2xl ml-4 flex-shrink-0 transition-all duration-200">
                  <span className="inline-block group-open:hidden">+</span>
                  <span className="hidden group-open:inline-block">−</span>
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 bg-green-50/50 dark:bg-gray-900/50 -mx-5 -mb-5 px-5 pb-5 rounded-b-xl">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-10 mb-4 flex flex-col sm:flex-row items-center gap-3">
          <span className="font-semibold text-lg sm:text-xl text-black-700 dark:text-black-300 text-center sm:text-left">Didn't find what you're looking for? Ask away!</span>
          <button onClick={()=>setShowModal(true)} aria-label="Ask a question" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl hover:brightness-110 active:scale-95 transition">
            <span className="text-base sm:text-lg">Ask</span>
            <span className="text-xl">➕</span>
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Community Questions</h3>
          <div className="flex items-center gap-2">
            <select value={selectedQuestionCategory} onChange={(e)=>setSelectedQuestionCategory(e.target.value)} className="p-2 rounded-lg border dark:bg-gray-900/50">
              {questionCategories.map((c)=> <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={sort} onChange={(e)=>setSort(e.target.value as any)} className="p-2 rounded-lg border dark:bg-gray-900/50">
              <option value="recent">Most Recent</option>
              <option value="upvoted">Most Upvoted</option>
            </select>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {filteredQuestions.map((q) => (
            <div key={q._id} className="p-4 rounded-xl border transition hover:shadow-lg bg-white/60 dark:bg-gray-800/60 border-white/40 dark:border-gray-700/40">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-800 dark:text-gray-200">{q.title}</p>
                    {q.answers.some(a => a.isAccepted) && (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium">
                        ✅ Solved
                      </span>
                    )}
                  </div>
                  {q.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{q.description}</p>
                  )}
                </div>
                <span className="text-xs text-gray-500">{new Date(q.createdAt).toLocaleString()}</span>
              </div>

              {q.answers.some(a => a.isAccepted) ? (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    
                    <button 
                      onClick={() => toggleShowAllAnswers(q._id)}
                      className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {showAllAnswers[q._id] ? 'Hide All' : 'Show All Answers'}
                    </button>
                  </div>
                  
                  {showAllAnswers[q._id] ? (
                    <div className="space-y-2">
                      {q.answers.map((a) => (
                        <div key={a._id} className={`p-3 rounded-lg border ${a.isAccepted ? "border-green-400 bg-green-50 dark:bg-green-900/20" : "border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/60"}`}>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-800 dark:text-gray-200">{a.content}</p>
                            <div className="flex items-center gap-2">
                              {a.isAccepted && <span className="text-xs text-green-600 dark:text-green-400 font-medium">ACCEPTED</span>}
                              <button onClick={()=>upvote(q._id,a._id)} className="text-sm px-2 py-1 rounded bg-blue-600 text-white hover:brightness-110" title="Helpful">👍 {a.upvotes}</button>
                              <button onClick={()=>downvote(q._id,a._id)} className="text-sm px-2 py-1 rounded bg-red-600 text-white hover:brightness-110" title="Not helpful">👎 {a.downvotes ?? 0}</button>
                              {!a.isAccepted && <button onClick={()=>accept(q._id,a._id)} className="text-sm px-2 py-1 rounded bg-green-600 text-white hover:brightness-110" title="Accept">✅</button>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <details className="group bg-white/50 dark:bg-gray-700/50 rounded-lg border border-green-400 p-3">
                      <summary className="cursor-pointer text-green-700 dark:text-green-300 hover:opacity-90 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className="text-lg">📋</span>
                          <span className="text-sm font-medium">Accepted Answer</span>
                        </span>
                        <span className="inline-block group-open:hidden text-lg">▼</span>
                        <span className="hidden group-open:inline-block text-lg">▲</span>
                      </summary>
                      <div className="mt-2 space-y-2">
                        {q.answers.filter(a=>a.isAccepted).map((a)=> (
                          <div key={a._id} className="p-3 rounded-lg bg-white/70 dark:bg-gray-800/60">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-800 dark:text-gray-200">{a.content}</p>
                              <div className="flex items-center gap-2">
                                <button onClick={()=>upvote(q._id,a._id)} className="text-sm px-2 py-1 rounded bg-blue-600 text-white hover:brightness-110" title="Helpful">👍 {a.upvotes}</button>
                                <button onClick={()=>downvote(q._id,a._id)} className="text-sm px-2 py-1 rounded bg-red-600 text-white hover:brightness-110" title="Not helpful">👎 {a.downvotes ?? 0}</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              ) : (
                <div className="mt-3 space-y-2">
                  {q.answers.map((a) => (
                    <div key={a._id} className={`p-3 rounded-lg border ${a.isAccepted ? "border-green-400" : "border-transparent"} bg-white/50 dark:bg-gray-700/50` }>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-800 dark:text-gray-200">{a.content}</p>
                        <div className="flex items-center gap-2">
                          <button onClick={()=>upvote(q._id,a._id)} className="text-sm px-2 py-1 rounded bg-blue-600 text-white hover:brightness-110" title="Helpful">👍 {a.upvotes}</button>
                          <button onClick={()=>downvote(q._id,a._id)} className="text-sm px-2 py-1 rounded bg-red-600 text-white hover:brightness-110" title="Not helpful">👎 {a.downvotes ?? 0}</button>
                          <button onClick={()=>accept(q._id,a._id)} className="text-sm px-2 py-1 rounded bg-green-600 text-white hover:brightness-110" title="Accept">✅</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

             
              {!q._id.startsWith('default-') && (
                <AnswerEditor onSubmit={(text)=>addAnswer(q._id, text)} />
              )}
            </div>
          ))}
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-[90%] max-w-md bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Ask a question</h4>
              <button 
                onClick={()=>setShowModal(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              >
                ✕
              </button>
            </div>
            <form onSubmit={(e)=>{submitQuestion(e); setShowModal(false);}} className="space-y-3">
              <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Your question" className="w-full p-3 rounded-lg border dark:bg-gray-800 focus:ring-2 focus:ring-blue-400 outline-none transition" />
              <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Short description (optional)" className="w-full p-3 rounded-lg border min-h-24 dark:bg-gray-800 focus:ring-2 focus:ring-blue-400 outline-none transition" />
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 dark:text-gray-400">Category</label>
                <select value={category} onChange={(e)=>setCategory(e.target.value)} className="p-2 rounded-lg border dark:bg-gray-800">
                  {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={()=>setShowModal(false)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:brightness-110 transition-all shadow-lg">Post Question</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="confetti-container">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`confetti-piece confetti-${i % 5}`}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AnswerEditor({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState("");
  return (
    <form
      onSubmit={(e)=>{ e.preventDefault(); onSubmit(text); setText(""); }}
      className="mt-3 flex items-center gap-2"
    >
      <input 
        value={text} 
        onChange={(e)=>setText(e.target.value)} 
        placeholder="Write an answer" 
        className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900/50 bg-white transition-all duration-200 hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 dark:hover:shadow-blue-500/20 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-transparent outline-none hover:scale-[1.01]" 
      />
      <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:brightness-110 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 hover:bg-blue-700 dark:hover:shadow-blue-500/50">Reply</button>
    </form>
  );
}
