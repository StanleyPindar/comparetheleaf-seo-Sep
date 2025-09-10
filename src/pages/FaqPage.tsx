import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';
import MetaTags from '../components/MetaTags';
import Breadcrumbs from '../components/Breadcrumbs';
import { enhancedFaqData, enhancedFaqCategories } from '../data/faqData';

const FaqPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter FAQs based on search and category
  const filteredFAQs = enhancedFaqData.filter(faq => {
    const matchesSearch = !searchTerm || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Group filtered FAQs by category for display
  const groupedFAQs = React.useMemo(() => {
    const groups: Record<string, typeof enhancedFaqData> = {};
    filteredFAQs.forEach(faq => {
      if (!groups[faq.category]) {
        groups[faq.category] = [];
      }
      groups[faq.category].push(faq);
    });
    return groups;
  }, [filteredFAQs]);

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Prepare FAQ data for schema
  const faqSchemaData = enhancedFaqData.map(faq => ({
    question: faq.question,
    answer: faq.answer,
    dateCreated: faq.dateCreated,
    dateModified: faq.dateModified,
    author: faq.author,
    upvoteCount: faq.upvoteCount,
    category: faq.category
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaTags 
        title="Medical Cannabis FAQ UK - Legal Questions & Answers 2024"
        description="Medical cannabis FAQ UK. Is it legal? How much does it cost? What conditions qualify? Get answers from medical experts. Legal since 2018, 36,000+ patients treated."
        type="FAQPage"
        datePublished="2024-01-15"
        dateModified="2024-02-25"
        author="CompareTheLeaf Medical Team"
        keywords={[
          'medical cannabis FAQ UK',
          'medical cannabis questions UK',
          'is medical cannabis legal UK',
          'medical cannabis cost UK',
          'how to get medical cannabis UK',
          'medical cannabis side effects',
          'medical cannabis driving UK',
          'medical cannabis conditions UK',
          'medical cannabis prescription FAQ',
          'UK medical cannabis guide',
          'compare medical cannabis clinics UK',
          'medical cannabis clinic UK'
        ]}
        canonicalUrl="https://comparetheleaf.co.uk/faq"
        faqData={faqSchemaData}
        breadcrumbData={[
          { name: 'Home', url: 'https://comparetheleaf.co.uk/' },
          { name: 'FAQ', url: 'https://comparetheleaf.co.uk/faq' }
        ]}
      />
      
      <Breadcrumbs 
        items={[
          { label: 'Home', path: '/' },
          { label: 'FAQ', path: '/faq' }
        ]}
      />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <HelpCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Medical Cannabis FAQ UK - Your Questions Answered
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to the most common questions about medical cannabis treatment in the UK, 
              including legality, costs, conditions, prescriptions, and finding the right clinic.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {enhancedFaqCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8" itemScope itemType="https://schema.org/FAQPage">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {searchTerm ? `Search Results (${filteredFAQs.length})` : 
               selectedCategory === 'All' ? 'All Questions' : selectedCategory}
            </h2>
            <p className="text-gray-600">
              {searchTerm ? 'Questions matching your search' : 
               selectedCategory === 'All' ? 'Comprehensive medical cannabis FAQ' : 
               enhancedFaqCategories.find(c => c.name === selectedCategory)?.description}
            </p>
          </div>

          {filteredFAQs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500">No questions found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 text-blue-600 hover:text-blue-800"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="p-6" itemScope itemType="https://schema.org/Question">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <div className="flex-1 pr-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2" itemProp="name">
                        {faq.question}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                          {faq.category}
                        </span>
                        {faq.difficulty && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            faq.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                            faq.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {faq.difficulty}
                          </span>
                        )}
                        {faq.upvoteCount && faq.upvoteCount > 0 && (
                          <span className="text-xs text-gray-500">
                            👍 {faq.upvoteCount} helpful
                          </span>
                        )}
                      </div>
                    </div>
                    {openItems.includes(faq.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openItems.includes(faq.id) && (
                    <div 
                      className="mt-4 prose prose-lg max-w-none"
                      itemProp="acceptedAnswer"
                      itemScope
                      itemType="https://schema.org/Answer"
                    >
                      <div itemProp="text" className="text-gray-700">
                        {faq.answer}
                      </div>
                      
                      {(faq.author || faq.dateModified) && (
                        <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
                          <div className="flex items-center justify-between">
                            {faq.author && (
                              <span itemProp="author" itemScope itemType="https://schema.org/Person">
                                By <span itemProp="name">{faq.author}</span>
                              </span>
                            )}
                            {faq.dateModified && (
                              <span itemProp="dateModified">
                                Updated {new Date(faq.dateModified).toLocaleDateString('en-GB')}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <meta itemProp="dateCreated" content={faq.dateCreated || '2024-01-15'} />
                  <meta itemProp="answerCount" content="1" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our team is here to help you understand medical cannabis treatment 
            and find the right clinic for your needs.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;