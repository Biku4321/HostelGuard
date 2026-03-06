'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, AlertOctagon, ThumbsUp, MessageSquare } from 'lucide-react';

export default function ComplaintBox() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [newText, setNewText] = useState('');
  const [loading, setLoading] = useState(false);

 
  const fetchComplaints = async () => {
    try {
      const res = await axios.get('https://hostelguard-1.onrender.com/api/complaints');
      setComplaints(res.data);
    } catch (err) { console.error(err); }
  };

  
  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async () => {
    if (!newText) return;
    setLoading(true);
    try {
      
      await axios.post('http://localhost:5000/api/complaints/add', {
        studentId: "STU-DEMO", 
        description: newText
      });
      setNewText('');
      fetchComplaints(); 
    } catch (err) { alert("Failed to send"); }
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
      
      
      <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-md h-fit">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MessageSquare size={20} className="text-indigo-600"/> Raise Complaint
        </h3>
        <textarea
            className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800"
            rows={4}
            placeholder="Describe issue (e.g., 'Cockroach in dal' or 'Water is dirty')..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
        />
        <button 
            onClick={handleSubmit}
            disabled={loading}
            className="mt-3 w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 flex justify-center items-center gap-2"
        >
            {loading ? "Analyzing..." : <>Submit Issue <Send size={16}/></>}
        </button>
      </div>

      
      <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md">
        <h3 className="font-bold text-gray-800 mb-4">AI-Filtered Feedback Feed</h3>
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {complaints.map((c) => (
                <div key={c._id} className={`p-4 rounded-lg border-l-4 shadow-sm flex justify-between items-start 
                    ${c.isUrgent ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-gray-300'}`}>
                    
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-gray-500">{c.studentId}</span>
                            <span className={`text-[10px] uppercase px-2 py-0.5 rounded font-bold 
                                ${c.category === 'Hygiene Issue' ? 'bg-orange-200 text-orange-800' : 
                                  c.category === 'Health Emergency' ? 'bg-red-200 text-red-900' : 'bg-blue-100 text-blue-800'}`}>
                                {c.category}
                            </span>
                        </div>
                        <p className="text-sm text-gray-800 font-medium">{c.description}</p>
                    </div>

                    <div className="text-right">
                        {c.sentimentScore < -0.3 ? 
                            <AlertOctagon className="text-red-500" size={24} /> : 
                            <ThumbsUp className="text-green-500" size={24} />
                        }
                        <p className="text-[10px] text-gray-400 mt-1">
                            Severity: {Math.abs(Math.round(c.sentimentScore * 100))}%
                        </p>
                    </div>
                </div>
            ))}
            {complaints.length === 0 && <p className="text-gray-400 text-center text-sm">No complaints yet.</p>}
        </div>
      </div>

    </div>
  );
}