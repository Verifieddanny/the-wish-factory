"use client";

import { useState } from "react";
import { Gift, Music, Calendar, Sparkles, Copy, Check, ArrowRight } from "lucide-react";
import { createWish } from "./action"; // Import the server action

export default function Home() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  // Handle the form submission manually to stop the redirect
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const result = await createWish(formData);

    if (result.success && result.id) {
      const link = `${window.location.origin}/share/${result.id}`;
      setGeneratedLink(link);
      setStatus("success");
    } else {
      alert("Something went wrong, please try again.");
      setStatus("idle");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset icon after 2s
  };

  return (
    // THEME CHANGE: Light, snowy background instead of dark void
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900">

      {/* Decorative Background Pattern */}
      <div className="fixed inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/snow.png')] pointer-events-none"></div>

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 relative z-10">

        {/* Header Strip */}
        <div className="h-2 bg-linear-to-r from-red-500 via-green-500 to-red-500"></div>

        <div className="p-8 md:p-12">

          {/* STATE 1: SUCCESS VIEW (The Link) */}
          {status === "success" ? (
            <div className="text-center space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="w-10 h-10 text-green-600 animate-bounce" />
              </div>

              <h2 className="text-3xl font-bold text-slate-800 font-serif">
                Your Gift is Ready!
              </h2>
              <p className="text-slate-500">
                Copy the link below and send it to your loved one via WhatsApp or Email.
              </p>

              {/* The Copy Box */}
              <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-lg border border-slate-300 mt-6">
                <input
                  placeholder="https://..."
                  readOnly
                  value={generatedLink}
                  className="bg-transparent flex-1 outline-none text-slate-600 text-sm px-2"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-white hover:bg-slate-50 border border-slate-200 p-2 rounded-md transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                </button>
              </div>

              <button
                onClick={() => { setStatus("idle"); setGeneratedLink(""); }}
                className="text-sm text-red-600 font-bold hover:underline mt-6 inline-flex items-center gap-1"
              >
                Create Another Wish <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (

            /* STATE 2: THE FORM (Creation) */
            <>
              <div className="text-center mb-10">
                <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">
                  The Wish Factory
                </h1>
                <p className="text-slate-500 uppercase tracking-widest text-xs">
                  Send a digital hug this holiday
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">From</label>
                    <input
                      name="sender"
                      required
                      placeholder="Your Name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">To</label>
                    <input
                      name="receiver"
                      required
                      placeholder="Their Name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Write your warm wishes here..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
                      <Music className="w-3 h-3" /> Music
                    </label>
                    <select title="song" name="song" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none cursor-pointer">

                      <optgroup label="Christmas (Nativity)">
                        <option value="song-1">Adeste Fideles</option>
                        <option value="song-2">O Holy Night (Cantique de Noël)</option>
                        <option value="song-3">Silent Night (Stille Nacht)</option>
                        <option value="song-4">Hark! The Herald Angels Sing</option>
                        <option value="song-5">Angels We Have Heard on High (Gloria in Excelsis Deo)</option>
                        <option value="song-6">Jingle Bells</option>
                      </optgroup>

                      <optgroup label="New Year (Blessings)">

                        <option value="song-9">Because He Lives</option>
                        <option value="song-7">Great Is Thy Faithfulness</option>
                        <option value="song-8">Be Thou My Vision</option>
                      </optgroup>

                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
                      <Calendar className="w-3 h-3" /> Occasion
                    </label>
                    <select title="ocassion" name="ocassion" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none cursor-pointer">
                      <option value="CHRISTMAS">🎄 Christmas</option>
                      <option value="NEW_YEAR">🎆 New Year</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <span className="animate-pulse">Wrapping Gift...</span>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" /> Generate Link
                    </>
                  )}
                </button>
              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}