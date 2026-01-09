/**
 * DCR Hub Component - V5 Masonry Layout (FINAL VERSION - LIGHT MODE)
 * DCR Motors - Giacomo Project
 * 
 * Masonry layout with mixed aspect ratios (9:16 TikTok + 16:9 YouTube)
 * VERSION: FINAL - Light mode igual a DCRUniverse
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Eye, Heart, MessageCircle, Share2, TrendingUp, Star, Filter, X } from 'lucide-react';

interface ContentPost {
  id: string;
  thumbnail: string;
  title: string;
  influencer: string;
  platform: 'TikTok' | 'YouTube';
  aspectRatio: '9:16' | '16:9';
  views: string;
  likes: string;
  comments: string;
  shares: string;
  trending: boolean;
  featured: boolean;
  vehicle?: string;
  tags: string[];
}

const mockPosts: ContentPost[] = [
  // TikTok items (9:16 vertical)
  {
    id: '1',
    thumbnail: '🏎️',
    title: 'Porsche 911 GT3 RS Review',
    influencer: '@luxurycars_cl',
    platform: 'TikTok',
    aspectRatio: '9:16',
    views: '1.2M',
    likes: '245K',
    comments: '3.2K',
    shares: '12.4K',
    trending: true,
    featured: true,
    vehicle: 'Porsche 911 GT3 RS',
    tags: ['#porsche', '#gt3', '#review', '#nürburgring']
  },
  {
    id: '2',
    thumbnail: '🔥',
    title: 'Lamborghini Huracán STO',
    influencer: '@supercars_daily',
    platform: 'TikTok',
    aspectRatio: '9:16',
    views: '890K',
    likes: '178K',
    comments: '2.8K',
    shares: '9.1K',
    trending: true,
    featured: false,
    vehicle: 'Lamborghini Huracán STO',
    tags: ['#lamborghini', '#sto', '#supercar']
  },
  {
    id: '3',
    thumbnail: '⚡',
    title: 'Ferrari F8 Tributo 0-300',
    influencer: '@dcr_alex',
    platform: 'TikTok',
    aspectRatio: '9:16',
    views: '756K',
    likes: '156K',
    comments: '2.1K',
    shares: '7.8K',
    trending: false,
    featured: true,
    vehicle: 'Ferrari F8 Tributo',
    tags: ['#ferrari', '#f8', '#speed']
  },
  {
    id: '4',
    thumbnail: '🏁',
    title: 'BMW M4 CSL Track Test',
    influencer: '@motor_tiktok',
    platform: 'TikTok',
    aspectRatio: '9:16',
    views: '645K',
    likes: '132K',
    comments: '1.9K',
    shares: '6.2K',
    trending: false,
    featured: false,
    vehicle: 'BMW M4 CSL',
    tags: ['#bmw', '#m4', '#track']
  },
  {
    id: '5',
    thumbnail: '💨',
    title: 'McLaren 720S Acceleration',
    influencer: '@luxurycars_cl',
    platform: 'TikTok',
    aspectRatio: '9:16',
    views: '523K',
    likes: '108K',
    comments: '1.6K',
    shares: '5.4K',
    trending: false,
    featured: false,
    vehicle: 'McLaren 720S',
    tags: ['#mclaren', '#720s', '#acceleration']
  },
  {
    id: '6',
    thumbnail: '🏆',
    title: 'DCR Motors Winner Experience',
    influencer: '@dcr_alex',
    platform: 'TikTok',
    aspectRatio: '9:16',
    views: '2.1M',
    likes: '445K',
    comments: '8.9K',
    shares: '34.2K',
    trending: true,
    featured: true,
    tags: ['#dcrmotors', '#winner', '#experience']
  },
  {
    id: '7',
    thumbnail: '🎯',
    title: 'Porsche 911 Turbo S',
    influencer: '@supercars_daily',
    platform: 'TikTok',
    aspectRatio: '9:16',
    views: '445K',
    likes: '89K',
    comments: '1.3K',
    shares: '4.2K',
    trending: false,
    featured: false,
    vehicle: 'Porsche 911 Turbo S',
    tags: ['#porsche', '#turbo', '#luxury']
  },
  {
    id: '8',
    thumbnail: '🚀',
    title: 'Lamborghini Revuelto First Look',
    influencer: '@motor_tiktok',
    platform: 'TikTok',
    aspectRatio: '9:16',
    views: '678K',
    likes: '145K',
    comments: '2.4K',
    shares: '8.9K',
    trending: true,
    featured: true,
    vehicle: 'Lamborghini Revuelto',
    tags: ['#lamborghini', '#revuelto', '#hybrid']
  },
  // YouTube items (16:9 horizontal)
  {
    id: '9',
    thumbnail: '🎬',
    title: 'Porsche 911 GT3 RS Full Review',
    influencer: '@supercars_daily',
    platform: 'YouTube',
    aspectRatio: '16:9',
    views: '2.8M',
    likes: '89K',
    comments: '4.5K',
    shares: '12.3K',
    trending: true,
    featured: true,
    vehicle: 'Porsche 911 GT3 RS',
    tags: ['#porsche', '#gt3', '#review', '#documentary']
  },
  {
    id: '10',
    thumbnail: '🎥',
    title: 'Ferrari F8 Tributo 0-300 KM/H',
    influencer: '@luxurycars_cl',
    platform: 'YouTube',
    aspectRatio: '16:9',
    views: '1.5M',
    likes: '67K',
    comments: '3.2K',
    shares: '8.9K',
    trending: false,
    featured: true,
    vehicle: 'Ferrari F8 Tributo',
    tags: ['#ferrari', '#f8', '#speedtest']
  },
  {
    id: '11',
    thumbnail: '🎞️',
    title: 'Lamborghini Huracán Road Trip',
    influencer: '@dcr_alex',
    platform: 'YouTube',
    aspectRatio: '16:9',
    views: '980K',
    likes: '45K',
    comments: '2.1K',
    shares: '5.6K',
    trending: false,
    featured: false,
    vehicle: 'Lamborghini Huracán',
    tags: ['#lamborghini', '#huracan', '#roadtrip']
  },
  {
    id: '12',
    thumbnail: '🎦',
    title: 'BMW M4 CSL Review',
    influencer: '@motor_tiktok',
    platform: 'YouTube',
    aspectRatio: '16:9',
    views: '756K',
    likes: '34K',
    comments: '1.8K',
    shares: '4.2K',
    trending: false,
    featured: false,
    vehicle: 'BMW M4 CSL',
    tags: ['#bmw', '#m4', '#review']
  }
];

export function DCRHub() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'trending' | 'featured'>('all');
  const [platformFilter, setPlatformFilter] = useState<'all' | 'TikTok' | 'YouTube'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<any>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(mockPosts.flatMap(post => post.tags)));

  // Filter posts
  const filteredPosts = mockPosts.filter(post => {
    const matchesTypeFilter =
      activeFilter === 'all' ||
      (activeFilter === 'trending' && post.trending) ||
      (activeFilter === 'featured' && post.featured);

    const matchesPlatformFilter =
      platformFilter === 'all' || post.platform === platformFilter;

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some(tag => post.tags.includes(tag));

    return matchesTypeFilter && matchesPlatformFilter && matchesTags;
  });

  // Initialize Masonry layout
  useEffect(() => {
    if (typeof window !== 'undefined' && gridRef.current) {
      import('masonry-layout').then((Masonry) => {
        if (gridRef.current && !masonryRef.current) {
          masonryRef.current = new Masonry.default(gridRef.current, {
            itemSelector: '.masonry-item',
            percentPosition: true,
            gutter: 24,
            columnWidth: '.masonry-sizer'
          });
        } else if (masonryRef.current) {
          masonryRef.current.layout();
        }
      });
    }

    return () => {
      if (masonryRef.current) {
        masonryRef.current.destroy();
        masonryRef.current = null;
      }
    };
  }, [filteredPosts.length]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearTags = () => {
    setSelectedTags([]);
  };

  return (
    <section style={{ backgroundColor: '#181f25', padding: '96px 24px' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0" style={{ position: 'sticky', top: '96px', height: 'fit-content' }}>
            <div 
              className="p-6"
              style={{ 
                backgroundColor: '#f1f2f4',
                borderRadius: '0rem',
                border: '1px solid #e3e6e8'
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5" style={{ color: '#181f25' }} />
                  <span 
                    className="font-semibold"
                    style={{ color: '#181f25' }}
                  >
                    Filters
                  </span>
                </div>
                {(activeFilter !== 'all' || platformFilter !== 'all' || selectedTags.length > 0) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearTags}
                    style={{ color: '#f7c01d', borderRadius: '0rem' }}
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Content Type Filter */}
              <div className="mb-6">
                <h4 
                  className="font-medium mb-3 text-sm"
                  style={{ color: '#798086' }}
                >
                  Content Type
                </h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Content' },
                    { value: 'trending', label: 'Trending' },
                    { value: 'featured', label: 'Featured' }
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setActiveFilter(filter.value as any)}
                      className="w-full text-left px-3 py-2 text-sm transition-colors"
                      style={{
                        backgroundColor: activeFilter === filter.value ? '#181f25' : 'transparent',
                        color: activeFilter === filter.value ? '#ffffff' : '#798086',
                        borderRadius: '0rem'
                      }}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform Filter */}
              <div className="mb-6">
                <h4 
                  className="font-medium mb-3 text-sm"
                  style={{ color: '#798086' }}
                >
                  Platform
                </h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Platforms' },
                    { value: 'TikTok', label: 'TikTok' },
                    { value: 'YouTube', label: 'YouTube' }
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setPlatformFilter(filter.value as any)}
                      className="w-full text-left px-3 py-2 text-sm transition-colors"
                      style={{
                        backgroundColor: platformFilter === filter.value ? '#181f25' : 'transparent',
                        color: platformFilter === filter.value ? '#ffffff' : '#798086',
                        borderRadius: '0rem'
                      }}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags Filter */}
              <div>
                <h4 
                  className="font-medium mb-3 text-sm"
                  style={{ color: '#798086' }}
                >
                  Tags
                </h4>
                <div className="space-y-2">
                  {allTags.slice(0, 9).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className="w-full text-left px-3 py-2 text-sm transition-colors flex items-center justify-between"
                      style={{
                        backgroundColor: selectedTags.includes(tag) ? '#181f25' : 'transparent',
                        color: selectedTags.includes(tag) ? '#ffffff' : '#798086',
                        borderRadius: '0rem'
                      }}
                    >
                      <span>{tag}</span>
                      {selectedTags.includes(tag) && (
                        <X className="w-3 h-3" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 
                    className="text-4xl font-bold mb-2"
                    style={{ color: '#181f25' }}
                  >
                    DCR HUB
                  </h2>
                  <p style={{ color: '#798086' }}>
                    Explore exclusive content from our influencer network
                  </p>
                </div>
                <div className="hidden md:flex gap-2">
                  <Button
                    variant={activeFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveFilter('all')}
                    style={{
                      backgroundColor: activeFilter === 'all' ? '#f7c01d' : 'transparent',
                      color: activeFilter === 'all' ? '#181f25' : '#798086',
                      border: activeFilter === 'all' ? 'none' : '1px solid #e3e6e8',
                      borderRadius: '0rem'
                    }}
                  >
                    All
                  </Button>
                  <Button
                    variant={activeFilter === 'trending' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveFilter('trending')}
                    style={{
                      backgroundColor: activeFilter === 'trending' ? '#f7c01d' : 'transparent',
                      color: activeFilter === 'trending' ? '#181f25' : '#798086',
                      border: activeFilter === 'trending' ? 'none' : '1px solid #e3e6e8',
                      borderRadius: '0rem'
                    }}
                  >
                    Trending
                  </Button>
                  <Button
                    variant={activeFilter === 'featured' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveFilter('featured')}
                    style={{
                      backgroundColor: activeFilter === 'featured' ? '#f7c01d' : 'transparent',
                      color: activeFilter === 'featured' ? '#181f25' : '#798086',
                      border: activeFilter === 'featured' ? 'none' : '1px solid #e3e6e8',
                      borderRadius: '0rem'
                    }}
                  >
                    Featured
                  </Button>
                </div>
              </div>

              {/* Results Count */}
              <div style={{ color: '#798086', fontSize: '14px' }}>
                Showing {filteredPosts.length} results
                {selectedTags.length > 0 && (
                  <span>
                    {' '}for {selectedTags.length} tag{selectedTags.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>

            {/* Masonry Grid */}
            <div 
              ref={gridRef}
              className="masonry-grid"
              style={{ position: 'relative' }}
            >
              {/* Sizer element */}
              <div className="masonry-sizer" style={{ width: 'calc(33.333% - 16px)' }}></div>

              {filteredPosts.map(post => (
                <Card
                  key={post.id}
                  className="masonry-item"
                  style={{
                    border: '1px solid #e3e6e8',
                    borderRadius: '0rem',
                    backgroundColor: '#ffffff',
                    marginBottom: '24px',
                    width: 'calc(33.333% - 16px)',
                    overflow: 'hidden'
                  }}
                >
                  <CardContent className="p-0">
                    {/* Thumbnail */}
                    <div 
                      className="relative flex items-center justify-center overflow-hidden"
                      style={{ 
                        aspectRatio: post.aspectRatio === '9:16' ? '9/16' : '16/9',
                        backgroundColor: '#f1f2f4'
                      }}
                    >
                      <div className="text-8xl">{post.thumbnail}</div>
                      
                      {/* Play Button Overlay */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"
                      >
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center"
                          style={{ 
                            backgroundColor: '#f7c01d',
                            opacity: 0,
                            transition: 'opacity 0.3s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                        >
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {post.trending && (
                          <Badge
                            className="flex items-center gap-1 text-xs font-semibold"
                            style={{
                              backgroundColor: '#f7c01d',
                              color: '#181f25',
                              borderRadius: '0rem'
                            }}
                          >
                            <TrendingUp className="w-3 h-3" />
                            TRENDING
                          </Badge>
                        )}
                        {post.featured && (
                          <Badge
                            className="flex items-center gap-1 text-xs font-semibold"
                            style={{
                              backgroundColor: '#f7c01d',
                              color: '#181f25',
                              borderRadius: '0rem'
                            }}
                          >
                            <Star className="w-3 h-3" />
                            FEATURED
                          </Badge>
                        )}
                      </div>

                      {/* Platform Badge */}
                      <div className="absolute top-3 right-3">
                        <Badge
                          className="text-xs font-semibold"
                          style={{
                            backgroundColor: post.platform === 'TikTok' ? '#00f2ea' : '#ff0000',
                            color: '#ffffff',
                            borderRadius: '0rem'
                          }}
                        >
                          {post.platform}
                        </Badge>
                      </div>

                      {/* Vehicle Badge */}
                      {post.vehicle && (
                        <div className="absolute bottom-3 left-3">
                          <Badge
                            className="text-xs font-semibold"
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              color: '#181f25',
                              borderRadius: '0rem'
                            }}
                          >
                            {post.vehicle}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content Info */}
                    <div className="p-4">
                      <h3 
                        className="font-semibold mb-2 line-clamp-2"
                        style={{ color: '#181f25' }}
                      >
                        {post.title}
                      </h3>

                      {/* Influencer Info */}
                      <div 
                        className="flex items-center gap-2 mb-3"
                        style={{ color: '#798086', fontSize: '14px' }}
                      >
                        <span className="font-medium">{post.influencer}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1"
                            style={{
                              backgroundColor: '#f1f2f4',
                              color: '#798086',
                              borderRadius: '0rem'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Engagement Metrics */}
                      <div 
                        className="flex items-center gap-4 pt-3"
                        style={{ borderTop: '1px solid #e3e6e8' }}
                      >
                        <div className="flex items-center gap-1" style={{ color: '#798086', fontSize: '13px' }}>
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center gap-1" style={{ color: '#798086', fontSize: '13px' }}>
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1" style={{ color: '#798086', fontSize: '13px' }}>
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                        <div className="flex items-center gap-1" style={{ color: '#798086', fontSize: '13px' }}>
                          <Share2 className="w-4 h-4" />
                          <span>{post.shares}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <div 
                className="text-center py-16"
                style={{ backgroundColor: '#f1f2f4', borderRadius: '0rem', border: '1px solid #e3e6e8' }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ color: '#181f25' }}
                >
                  No content found
                </h3>
                <p style={{ color: '#798086' }}>
                  Try adjusting your filters to see more results
                </p>
                <Button
                  onClick={clearTags}
                  className="mt-4"
                  style={{
                    backgroundColor: '#f7c01d',
                    color: '#181f25',
                    borderRadius: '0rem'
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
