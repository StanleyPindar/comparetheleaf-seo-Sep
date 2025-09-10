import { supabase } from '../lib/supabase';

interface Review {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  clinicId: string;
  rating?: number;
  tags?: string[];
}

// Cache for reviews to avoid repeated database calls
let reviewsCache: Review[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getAllReviews = async (): Promise<Review[]> => {
  try {
    // Check cache first
    const now = Date.now();
    if (reviewsCache && (now - cacheTimestamp) < CACHE_DURATION) {
      return reviewsCache;
    }

    // Fetch published reviews from Supabase
    const { data, error } = await supabase
      .from('clinics')
      .select('*')
      .eq('review_published', true)
      .not('slug', 'is', null)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews from Supabase:', error);
      return getFallbackReviews();
    }

    if (!data || data.length === 0) {
      console.warn('No published reviews found in Supabase');
      return getFallbackReviews();
    }

    // Transform Supabase data to Review format
    const reviews: Review[] = data.map(clinic => ({
      id: clinic.id,
      slug: clinic.slug,
      title: `${clinic.name} Review`,
      excerpt: clinic.review_introduction ? 
        clinic.review_introduction.replace(/<[^>]*>/g, '').substring(0, 160) + '...' :
        `Comprehensive review of ${clinic.name}, covering services, pricing, patient experience, and recommendations.`,
      content: clinic.review_introduction || `<h2>About ${clinic.name}</h2><p>Comprehensive review coming soon.</p>`,
      author: 'CompareTheLeaf Medical Team',
      date: clinic.updated_at || new Date().toISOString(),
      clinicId: clinic.id,
      rating: clinic.rating,
      tags: clinic.specialisations || []
    }));

    // Update cache
    reviewsCache = reviews;
    cacheTimestamp = now;

    return reviews;
  } catch (error) {
    console.error('Error loading reviews:', error);
    return getFallbackReviews();
  }
};

// Get review by slug
export const getReviewBySlug = async (slug: string): Promise<Review | null> => {
  try {
    // Try to get from cache first
    const reviews = await getAllReviews();
    const cachedReview = reviews.find(review => review.slug === slug);
    if (cachedReview) {
      return cachedReview;
    }

    // If not in cache, fetch directly from database
    const { data, error } = await supabase
      .from('clinics')
      .select('*')
      .eq('slug', slug)
      .eq('review_published', true)
      .maybeSingle();

    if (error) {
      console.error('Error fetching review by slug:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    // Transform and return
    const review: Review = {
      id: data.id,
      slug: data.slug,
      title: `${data.name} Review`,
      excerpt: data.review_introduction ? 
        data.review_introduction.replace(/<[^>]*>/g, '').substring(0, 160) + '...' :
        `Comprehensive review of ${data.name}, covering services, pricing, patient experience, and recommendations.`,
      content: data.review_introduction || `<h2>About ${data.name}</h2><p>Comprehensive review coming soon.</p>`,
      author: 'CompareTheLeaf Medical Team',
      date: data.updated_at || new Date().toISOString(),
      clinicId: data.id,
      rating: data.rating,
      tags: data.specialisations || []
    };

    return review;
  } catch (error) {
    console.error('Error fetching review by slug:', error);
    return null;
  }
};

// Fallback reviews for when Supabase is unavailable
const getFallbackReviews = (): Review[] => {
  return [
    {
      id: 'cb1-medical',
      slug: 'cb1-medical-review',
      title: 'CB1 Medical Review',
      excerpt: 'Comprehensive review of CB1 Medical, the UK\'s most affordable medical cannabis clinic with £50 flat fee covering all consultations for 12 months.',
      content: '<h2>CB1 Medical Review</h2><p>CB1 Medical has branded itself the "UK\'s most affordable medical-cannabis clinic," charging a single £50 flat fee that covers every consultation for an entire year.</p>',
      author: 'CompareTheLeaf Medical Team',
      date: '2024-02-10',
      clinicId: 'cb1-medical',
      rating: 4.8,
      tags: ['affordable', 'flat-fee', 'leicester']
    },
    {
      id: 'releaf',
      slug: 'releaf-review',
      title: 'Releaf Review',
      excerpt: 'Comprehensive review of Releaf, the UK\'s premium medical cannabis clinic with all-inclusive subscription model and 100% money-back guarantee.',
      content: '<h2>Releaf Review</h2><p>Releaf has carved out a premium, all-inclusive niche in the UK medical-cannabis arena by bundling every clinical touch-point into a single subscription.</p>',
      author: 'CompareTheLeaf Medical Team',
      date: '2024-02-15',
      clinicId: 'releaf',
      rating: 4.9,
      tags: ['premium', 'subscription', 'guarantee']
    }
  ];
};

// Clear cache function for admin use
const clearReviewCache = (): void => {
  reviewsCache = null;
  cacheTimestamp = 0;
};