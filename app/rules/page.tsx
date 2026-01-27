'use client';

import { useState } from 'react';
import content from '@/data/content.json';

export default function RulesPage() {
  const { rules } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50">
      {/* Header Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Rules & Guidelines
          </h1>
          <p className="text-xl text-gray-600">
            Please read and follow our community guidelines to ensure a safe and professional environment for everyone.
          </p>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {rules.sections.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-sky-100"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-sky-50 transition-colors"
                >
                  <span className="text-xl font-semibold text-gray-900">
                    {section.title}
                  </span>
                  <svg
                    className={`w-6 h-6 text-sky-500 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-[1000px] py-5' : 'max-h-0'
                  }`}
                >
                  {section.content && section.content.length > 0 && (
                    <div className="mb-4">
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-gray-600 leading-relaxed mb-3">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  {section.items && section.items.length > 0 && (
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-sky-100 text-sky-600 mr-3 mt-0.5">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                          </span>
                          <span className="text-gray-700 flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-sky-500 to-cyan-500 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
            <p className="text-lg mb-6 text-white/90">
              Our support team is here to help you understand our guidelines better.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-sky-600 px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all transform hover:scale-105"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
