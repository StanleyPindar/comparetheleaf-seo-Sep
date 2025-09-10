import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Star, User, Calendar, ArrowRight, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import StarRating from '../components/common/StarRating';
import MetaTags from '../components/MetaTags';
import Breadcrumbs from '../components/Breadcrumbs';

const ReviewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [publishedReviews, setPublishedReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchPublishedReviews();
  }, []);

  const fetchPublishedReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // First, let's check what columns actually exist and get all clinics
      const { data, error } = await supabase
        .from('clinics')
        .select('id,name,slug,rating,review_count,description,updated_at,location,consultation_price,annual_cost_first_year,specialisations,active')
        .eq('active', true)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      
      // Show all active clinics - we have review pages for all major clinics
      const clinicsWithReviews = (data || []).map(clinic => ({
        ...clinic,
        review_slug: clinic.slug || clinic.name?.toLowerCase().replace(/\s+/g, '-') + '-review'
      }));
      
      setPublishedReviews(clinicsWithReviews);
    } catch (err) {
      console.error('Error fetching published reviews:', err);
      setError('Failed to load reviews');
      
      // Fallback to hardcoded reviews if database fails
      setPublishedReviews([
        {
          id: 'cb1-medical',
          name: 'CB1 Medical',
          review_slug: 'cb1-medical-review',
          rating: 4.8,
          review_count: 550,
          description: 'UK\'s most affordable medical cannabis clinic with £50 flat fee covering all consultations for 12 months.',
          updated_at: '2024-02-10',
          location: 'Leicester, UK',
          consultation_price: 50,
          annual_cost_first_year: 50,
          specialisations: ['Chronic Pain', 'Anxiety', 'Sleep Disorders'],
          cqc_registered: true
        },
        {
          id: 'releaf',
          name: 'Releaf',
          review_slug: 'releaf-review',
          rating: 4.9,
          review_count: 2100,
          description: 'UK\'s premium medical cannabis clinic with all-inclusive subscription model and 100% money-back guarantee.',
          updated_at: '2024-02-15',
          location: 'UK Wide (Online)',
          consultation_price: 99.99,
          annual_cost_first_year: 579.87,
          specialisations: ['Chronic Pain', 'Anxiety', 'Sleep Disorders', 'PTSD'],
          cqc_registered: true
        },
        {
          id: 'alternaleaf',
          name: 'Alternaleaf',
          review_slug: 'alternaleaf-review',
          rating: 4.6,
          review_count: 892,
          description: 'UK\'s most affordable medical cannabis clinic with £10 consultation and £10 monthly subscription.',
          updated_at: '2024-02-20',
          location: 'UK Wide (Online)',
          consultation_price: 10,
          annual_cost_first_year: 120,
          specialisations: ['Chronic Pain', 'Anxiety', 'Sleep Disorders'],
          cqc_registered: true
        },
        {
          id: 'mamedica',
          name: 'Mamedica',
          review_slug: 'mamedica-review',
          rating: 4.5,
          review_count: 1200,
          description: 'UK\'s value-for-life medical cannabis clinic with £150 initial consultation and £75 annual reviews.',
          updated_at: '2024-02-25',
          location: 'UK Wide (Online)',
          consultation_price: 150,
          annual_cost_first_year: 225,
          specialisations: ['Chronic Pain', 'Anxiety', 'Sleep Disorders'],
          cqc_registered: true
        },
        {
          id: 'cantourage',
          name: 'Cantourage Clinic',
          review_slug: 'cantourage-review',
          rating: 4.2,
          review_count: 320,
          description: 'Veterans-focused medical cannabis clinic with German GMP-grade sourcing and Combat Stress partnership.',
          updated_at: '2024-02-28',
          location: 'London, UK (Online)',
          consultation_price: 99,
          annual_cost_first_year: 215,
          specialisations: ['PTSD', 'Chronic Pain', 'Anxiety'],
          cqc_registered: true
        },
        {
          id: 'dispensed',
          name: 'Dispensed',
          review_slug: 'dispensed-review',
          rating: 4.4,
          review_count: 125,
          description: 'UK\'s credit-back medical cannabis clinic with £19 consultations credited against prescriptions.',
          updated_at: '2024-03-01',
          location: 'Lancashire, UK (Online)',
          consultation_price: 19,
          annual_cost_first_year: 76,
          specialisations: ['Chronic Pain', 'Anxiety', 'Sleep Disorders'],
          cqc_registered: true
        },
        {
          id: 'birmingham-cannabis-care',
          name: 'Birmingham Cannabis Clinic',
          review_slug: 'birmingham-cannabis-clinic-review',
          rating: 4.0,
          review_count: 180,
          description: 'West Midlands\' dedicated face-to-face medical cannabis clinic for chronic pain patients.',
          updated_at: '2024-03-05',
          location: 'Sutton Coldfield, Birmingham',
          consultation_price: 50,
          annual_cost_first_year: 315,
          specialisations: ['Chronic Pain'],
          cqc_registered: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClinicClick = (slug: string) => {
    navigate(`/reviews/${slug}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaTags 
        title="Medical Cannabis Clinic Reviews UK - 2,000+ Patient Reviews & Ratings"
        description="Medical cannabis clinic reviews UK. 2,000+ verified patient reviews, clinic ratings & treatment outcomes. Compare experiences, find best clinics for your condition. Real testimonials."
        keywords={[
          'medical cannabis clinic reviews UK',
          'medical cannabis patient reviews',
          'UK medical cannabis testimonials',
          'medical cannabis clinic ratings',
          'best medical cannabis clinics UK',
          'medical cannabis patient experiences',
          'medical cannabis clinic feedback',
          'verified medical cannabis reviews',
          'medical cannabis treatment reviews',
          'UK cannabis clinic comparison',
          'compare medical cannabis clinics UK',
          'medical cannabis clinic UK'
        ]}
        canonicalUrl="https://comparetheleaf.co.uk/reviews"
      />
      
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'Home', path: '/' },
          { label: 'Clinic Reviews', path: '/reviews' }
        ]}
      />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Medical Cannabis Clinic Reviews UK - Patient Testimonials & Ratings
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Read authentic reviews from UK medical cannabis patients. Compare clinic ratings, patient experiences, 
              and treatment outcomes to find the best clinic for your specific medical needs.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Long-Form Reviews */}
      {publishedReviews.length > 0 && (
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Clinic Reviews</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {publishedReviews.map((clinic) => (
                <Link 
                  key={clinic.id} 
                  to={`/reviews/${clinic.review_slug}`}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
                >
                  {/* Hero Image */}
                  <div 
                    className="h-48 flex items-center justify-center"
                    style={{ backgroundColor: clinic.hero_background_color || '#4F46E5' }}
                  >
                    {clinic.clinic_logo_url ? (
                      <img
                        src={clinic.clinic_logo_url}
                        alt={`${clinic.name} Logo`}
                        className="max-h-32 max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`text-white text-center ${clinic.clinic_logo_url ? 'hidden' : ''}`}>
                      <div className="text-4xl font-bold mb-2">{clinic.name.charAt(0)}</div>
                      <div className="text-sm opacity-90">Medical Cannabis Clinic</div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                        Expert Review
                      </span>
                      {clinic.cqc_registered && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 mr-1" />
                          CQC Registered
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {clinic.name} Review
                    </h3>
                    
                    <div className="flex items-center mb-4">
                      <StarRating value={Math.round(clinic.rating || 0)} size={18} />
                      <span className="ml-2 text-lg font-semibold">{(clinic.rating || 0).toFixed(1)}</span>
                      <span className="text-gray-600 ml-2">({clinic.review_count || 0} reviews)</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {clinic.review_introduction ? 
                        clinic.review_introduction.replace(/<[^>]*>/g, '').substring(0, 120) + '...' :
                        clinic.description || 
                        `Comprehensive review of ${clinic.name}, covering services, pricing, patient experience, and recommendations.`
                      }
                    </p>
                    
                    {/* Pricing Summary */}
                    <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-xs text-gray-500">Initial Consultation</div>
                        <div className="font-semibold text-blue-600">£{clinic.consultation_price || clinic.consultation_fee || 'TBC'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Annual Cost</div>
                        <div className="font-semibold text-green-600">£{clinic.annual_cost_first_year || clinic.annual_cost || 'TBC'}</div>
                      </div>
                    </div>
                    
                    {/* Specializations */}
                    {clinic.specialisations && clinic.specialisations.length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs text-gray-500 mb-2">Specializations</div>
                        <div className="flex flex-wrap gap-1">
                          {clinic.specialisations.slice(0, 3).map((spec: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {spec}
                            </span>
                          ))}
                          {clinic.specialisations.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                              +{clinic.specialisations.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center text-blue-600 text-sm font-medium">
                        Read Full Review
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Other Clinic Reviews */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {publishedReviews.length > 0 ? 'All Published Reviews' : 'Clinic Reviews'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
              ))
            ) : error ? (
              <div className="col-span-3 text-center py-12">
                <p className="text-red-600">Error loading clinics: {error}</p>
              </div>
            ) : publishedReviews.length > 0 ? (
              publishedReviews
                .map((clinic) => (
                <div 
                  key={clinic.id} 
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer overflow-hidden border border-gray-200"
                  onClick={() => handleClinicClick(clinic.slug || clinic.id)}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {clinic.name} Review
                    </h3>
                    
                    <div className="flex items-center mb-4">
                      <StarRating value={Math.round(clinic.rating || 0)} size={16} />
                      <span className="ml-2 text-sm text-gray-600">
                        {clinic.rating?.toFixed(1) || 'N/A'} 
                        ({clinic.review_count || 0} reviews)
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {clinic.review_introduction || clinic.description || 'Comprehensive clinic review.'}
                    </p>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-500">
                        Updated: {formatDate(clinic.updated_at)}
                      </span>
                      <div className="flex items-center text-blue-600 text-sm font-medium">
                        Read Review
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <Star className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Clinic Reviews Coming Soon
                </h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  We have detailed reviews available for several clinics. Use the navigation menu above to access individual clinic reviews, or browse all clinics below.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <button
                    onClick={() => navigate('/reviews/cb1-medical-review')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    CB1 Medical Review
                  </button>
                  <button
                    onClick={() => navigate('/reviews/releaf-review')}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Releaf Review
                  </button>
                  <button
                    onClick={() => navigate('/reviews/alternaleaf-review')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Alternaleaf Review
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto mt-4">
                  <button
                    onClick={() => navigate('/reviews/mamedica-review')}
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                  >
                    Mamedica Review
                  </button>
                  <button
                    onClick={() => navigate('/reviews/cantourage-review')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Cantourage Review
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto mt-4">
                  <button
                    onClick={() => navigate('/reviews/dispensed-review')}
                    className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                  >
                    Dispensed Review
                  </button>
                  <button
                    onClick={() => navigate('/reviews/birmingham-cannabis-clinic-review')}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Birmingham Cannabis Clinic
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Want to see more clinic reviews?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Take our clinic matching quiz to find the perfect clinic for your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/quiz')}
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-md hover:from-blue-700 hover:to-green-700 transition-all font-medium"
              >
                Take Our Clinic Quiz
              </button>
              <button
                onClick={() => navigate('/clinics')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
              >
                Browse All Clinics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clinic Highlights */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Find Your Perfect Clinic
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Compare UK medical cannabis clinics based on specialties, pricing, and patient reviews.
            Find the right clinic for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/clinics')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Compare All Clinics
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
            >
              Take Our Clinic Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;