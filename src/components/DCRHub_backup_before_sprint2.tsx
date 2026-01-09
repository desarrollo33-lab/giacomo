import React, { useState, useRef, useEffect } from 'react';
import { Play, Eye, Heart, MessageCircle, Share2, Filter, TrendingUp, Star, Video, Youtube } from 'lucide-react';
import Masonry from 'masonry-layout';

// Types
type FilterType = 'all' | 'trending' | 'featured';
type PlatformFilter = 'all' | 'tiktok' | 'youtube';

// Mock Data - Influencers
const INFLUENCERS = [
  {
    id: '1',
    name: 'Carla Morandé',
    username: '@carlamotors',
    avatar: 'CM',
    tier: 'Elite',
    followers: '245K'
  },
  {
    id: '2',
    name: 'Tomás Cox',
    username: '@tomasporsche',
    avatar: 'TC',
    tier: 'Pro',
    followers: '180K'
  },
  {
    id: '3',
    name: 'Francisca García',
    username: '@ficcilamborghini',
    avatar: 'FG',
    tier: 'Rising',
    followers: '95K'
  },
  {
    id: '4',
    name: 'Matías Pérez',
    username: '@matiasbmw',
    avatar: 'MP',
    tier: 'Pro',
    followers: '150K'
  }
];

// Mock Data - Content Posts (Mixed: TikTok 9:16, YouTube 16:9)
const CONTENT_POSTS = [
  // TIKTOK - 9:16 Vertical Videos
  {
    id: '1',
    influencerId: '1',
    type: 'video',
    platform: 'tiktok' as const,
    aspectRatio: '9:16' as const,
    thumbnail: '🏎️',
    title: 'Mi experiencia con la nueva Porsche 911 GT3 RS',
    views: '1.2M',
    likes: '89K',
    comments: '2.3K',
    shares: '15K',
    isTrending: true,
    isFeatured: true,
    tags: ['#porsche', '#gt3rs', '#review'],
    vehicle: 'Porsche 911 GT3 RS'
  },
  {
    id: '2',
    influencerId: '2',
    type: 'video',
    platform: 'tiktok' as const,
    aspectRatio: '9:16' as const,
    thumbnail: '🔥',
    title: 'POR FIN CONDUZCO UNA LAMBORGHINI HURACÁN',
    views: '890K',
    likes: '67K',
    comments: '1.8K',
    shares: '12K',
    isTrending: true,
    isFeatured: false,
    tags: ['#lamborghini', '#huracan', '#supercar'],
    vehicle: 'Lamborghini Huracán'
  },
  {
    id: '3',
    influencerId: '3',
    type: 'video',
    platform: 'tiktok' as const,
    aspectRatio: '9:16' as const,
    thumbnail: '⚡',
    title: 'La Ferrari que rompió todos los récords',
    views: '756K',
    likes: '54K',
    comments: '1.5K',
    shares: '9.8K',
    isTrending: false,
    isFeatured: true,
    tags: ['#ferrari', '#f8tributo', '#speed'],
    vehicle: 'Ferrari F8 Tributo'
  },
  // YOUTUBE - 16:9 Horizontal Videos
  {
    id: '4',
    influencerId: '4',
    type: 'video',
    platform: 'youtube' as const,
    aspectRatio: '16:9' as const,
    thumbnail: '🎬',
    title: 'BMW M4 Competition vs M4 CSL - COMPARATIVA COMPLETA',
    views: '645K',
    likes: '48K',
    comments: '2.1K',
    shares: '8.5K',
    isTrending: true,
    isFeatured: false,
    tags: ['#bmw', '#m4', '#comparacion'],
    vehicle: 'BMW M4 Competition'
  },
  {
    id: '5',
    influencerId: '1',
    type: 'video',
    platform: 'youtube' as const,
    aspectRatio: '16:9' as const,
    thumbnail: '🎥',
    title: '5 RAZONES para elegir una McLaren 720S - FULL REVIEW',
    views: '523K',
    likes: '41K',
    comments: '1.2K',
    shares: '7.2K',
    isTrending: false,
    isFeatured: true,
    tags: ['#mclaren', '#720s', '#top5'],
    vehicle: 'McLaren 720S'
  },
  {
    id: '6',
    influencerId: '2',
    type: 'video',
    platform: 'youtube' as const,
    aspectRatio: '16:9' as const,
    thumbnail: '🏆',
    title: 'El DÍA que gané el sorteo de DCR MOTORS - MI HISTORIA',
    views: '2.1M',
    likes: '156K',
    comments: '4.5K',
    shares: '28K',
    isTrending: true,
    isFeatured: true,
    tags: ['#dcrmotors', '#winner', '#raffle'],
    vehicle: 'Ducati Streetfighter V4'
  },
  // More TikTok 9:16
  {
    id: '7',
    influencerId: '3',
    type: 'video',
    platform: 'tiktok' as const,
    aspectRatio: '9:16' as const,
    thumbnail: '💨',
    title: 'Ferrari F8 Tributo: 0-300 KM/H en TIKTOK',
    views: '1.5M',
    likes: '98K',
    comments: '4.2K',
    shares: '15K',
    isTrending: true,
    isFeatured: false,
    tags: ['#ferrari', '#f8tributo', '#acceleration'],
    vehicle: 'Ferrari F8 Tributo'
  },
  {
    id: '8',
    influencerId: '4',
    type: 'video',
    platform: 'tiktok' as const,
    aspectRatio: '9:16' as const,
    thumbnail: '🎯',
    title: 'LAMBORGHINI HURACÁN ROAD TRIP - Shorts',
    views: '980K',
    likes: '72K',
    comments: '3.1K',
    shares: '11K',
    isTrending: false,
    isFeatured: true,
    tags: ['#lamborghini', '#huracan', '#roadtrip'],
    vehicle: 'Lamborghini Huracán'
  }
];

// Tags con colores únicos
const TAGS = [
  { name: '#porsche', color: '#11998e' },
  { name: '#lamborghini', color: '#f59e0b' },
  { name: '#ferrari', color: '#dc2626' },
  { name: '#mclaren', color: '#7c3aed' },
  { name: '#bmw', color: '#8b5cf6' },
  { name: '#audi', color: '#ec4899' },
  { name: '#mercedes', color: '#3b82f6' },
  { name: '#dcrmotors', color: '#f7c01d' },
  { name: '#review', color: '#06b6d4' },
  { name: '#speed', color: '#ef4444' }
];

export const DCRHub: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Masonry ref
  const masonryRef = useRef<HTMLDivElement>(null);
  const masonryInstance = useRef<Masonry | null>(null);

  // Get influencer by ID
  const getInfluencer = (id: string) => INFLUENCERS.find(i => i.id === id);

  // Filter posts
  const filteredPosts = CONTENT_POSTS.filter(post => {
    // Filter by type
    if (activeFilter === 'trending' && !post.isTrending) return false;
    if (activeFilter === 'featured' && !post.isFeatured) return false;

    // Filter by platform
    if (platformFilter === 'tiktok' && post.platform !== 'tiktok') return false;
    if (platformFilter === 'youtube' && post.platform !== 'youtube') return false;

    // Filter by tags
    if (selectedTags.length > 0) {
      const hasTag = selectedTags.some(tag => post.tags.includes(tag));
      if (!hasTag) return false;
    }

    return true;
  });

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Stats calculation
  const totalViews = CONTENT_POSTS.reduce((acc, post) => {
    const views = parseFloat(post.views.replace('M', '')) * 1000000;
    return acc + views;
  }, 0);

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  // Initialize Masonry layout
  useEffect(() => {
    if (masonryRef.current) {
      // Initialize Masonry
      masonryInstance.current = new Masonry(masonryRef.current, {
        itemSelector: '.masonry-item',
        columnWidth: '.masonry-sizer',
        percentPosition: true,
        gutter: 24,
        horizontalOrder: false
      });

      // Cleanup
      return () => {
        if (masonryInstance.current) {
          masonryInstance.current.destroy();
        }
      };
    }
  }, []);

  // Re-layout on filter change
  useEffect(() => {
    if (masonryInstance.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        masonryInstance.current?.layout();
      }, 100);
    }
  }, [filteredPosts]);

  return (
    <section className="py-24" style={{ backgroundColor: '#ffffff' }}>
      <div className="container mx-auto px-4 md:px-12">
        
        {/* Header */}
        <div className="mb-12">
          {/* Badge - Changed to yellow background with black text for better contrast */}
          <div 
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-4"
            style={{ backgroundColor: '#f7c01d', border: 'none' }}
          >
            <Video className="w-5 h-5" style={{ color: '#181f25' }} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: '#181f25' }}>
              Influencer Network
            </span>
          </div>

          {/* Title */}
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4" style={{ color: '#181f25' }}>
            DCR HUB
          </h2>

          {/* Description */}
          <p className="max-w-2xl text-base font-medium leading-relaxed mb-6" style={{ color: '#798086' }}>
            Descubre el contenido creado por nuestra red de influencers de automovilismo más grande de Chile. 
            TikTok Shorts (9:16) y YouTube (16:9) en un layout tipo Pinterest.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            <div>
              <span className="text-3xl font-black" style={{ color: '#181f25' }}>{INFLUENCERS.length}</span>
              <span className="text-xs font-bold uppercase tracking-widest ml-2" style={{ color: '#798086' }}>Influencers</span>
            </div>
            <div>
              <span className="text-3xl font-black" style={{ color: '#181f25' }}>{CONTENT_POSTS.length}</span>
              <span className="text-xs font-bold uppercase tracking-widest ml-2" style={{ color: '#798086' }}>Content</span>
            </div>
            <div>
              <span className="text-3xl font-black" style={{ color: '#181f25' }}>{formatViews(totalViews)}</span>
              <span className="text-xs font-bold uppercase tracking-widest ml-2" style={{ color: '#798086' }}>Views</span>
            </div>
          </div>
        </div>

        {/* Main Layout: Sidebar + Masonry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Vertical Filter Bar */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              
              {/* Filter Icon */}
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5" style={{ color: '#181f25' }} />
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#181f25' }}>
                  Filters
                </span>
              </div>

              {/* Content Type Filters */}
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: '#798086' }}>
                  Content Type
                </p>
                
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`w-full text-left px-4 py-3 font-medium text-sm transition-all duration-200 ${
                    activeFilter === 'all' ? '' : 'hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: activeFilter === 'all' ? '#181f25' : 'transparent',
                    color: activeFilter === 'all' ? '#ffffff' : '#181f25',
                    border: activeFilter === 'all' ? 'none' : '1px solid #e3e6e8'
                  }}
                >
                  All Content
                </button>

                <button
                  onClick={() => setActiveFilter('trending')}
                  className={`w-full text-left px-4 py-3 font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                    activeFilter === 'trending' ? '' : 'hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: activeFilter === 'trending' ? '#181f25' : 'transparent',
                    color: activeFilter === 'trending' ? '#ffffff' : '#181f25',
                    border: activeFilter === 'trending' ? 'none' : '1px solid #e3e6e8'
                  }}
                >
                  <TrendingUp className="w-4 h-4" />
                  Trending
                </button>

                <button
                  onClick={() => setActiveFilter('featured')}
                  className={`w-full text-left px-4 py-3 font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                    activeFilter === 'featured' ? '' : 'hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: activeFilter === 'featured' ? '#181f25' : 'transparent',
                    color: activeFilter === 'featured' ? '#ffffff' : '#181f25',
                    border: activeFilter === 'featured' ? 'none' : '1px solid #e3e6e8'
                  }}
                >
                  <Star className="w-4 h-4" />
                  Featured
                </button>
              </div>

              {/* Platform Filters */}
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: '#798086' }}>
                  Platform
                </p>
                
                <button
                  onClick={() => setPlatformFilter('all')}
                  className={`w-full text-left px-4 py-3 font-medium text-sm transition-all duration-200 ${
                    platformFilter === 'all' ? '' : 'hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: platformFilter === 'all' ? '#f7c01d' : 'transparent',
                    color: platformFilter === 'all' ? '#181f25' : '#181f25',
                    border: platformFilter === 'all' ? 'none' : '1px solid #e3e6e8'
                  }}
                >
                  All Platforms
                </button>

                <button
                  onClick={() => setPlatformFilter('tiktok')}
                  className={`w-full text-left px-4 py-3 font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                    platformFilter === 'tiktok' ? '' : 'hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: platformFilter === 'tiktok' ? '#f7c01d' : 'transparent',
                    color: platformFilter === 'tiktok' ? '#181f25' : '#181f25',
                    border: platformFilter === 'tiktok' ? 'none' : '1px solid #e3e6e8'
                  }}
                >
                  <Video className="w-4 h-4" />
                  TikTok (9:16)
                </button>

                <button
                  onClick={() => setPlatformFilter('youtube')}
                  className={`w-full text-left px-4 py-3 font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                    platformFilter === 'youtube' ? '' : 'hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: platformFilter === 'youtube' ? '#f7c01d' : 'transparent',
                    color: platformFilter === 'youtube' ? '#181f25' : '#181f25',
                    border: platformFilter === 'youtube' ? 'none' : '1px solid #e3e6e8'
                  }}
                >
                  <Youtube className="w-4 h-4" />
                  YouTube (16:9)
                </button>
              </div>

              {/* Tags Filter */}
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: '#798086' }}>
                  Tags
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {TAGS.map(tag => (
                    <button
                      key={tag.name}
                      onClick={() => toggleTag(tag.name)}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                        selectedTags.includes(tag.name) ? 'text-white' : ''
                      }`}
                      style={{
                        backgroundColor: selectedTags.includes(tag.name) ? tag.color : 'transparent',
                        color: selectedTags.includes(tag.name) ? '#ffffff' : tag.color,
                        border: `1px solid ${tag.color}`
                      }}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>

                {/* Clear Tags */}
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="text-xs font-medium underline mt-2"
                    style={{ color: '#798086' }}
                  >
                    Clear all tags
                  </button>
                )}
              </div>

              {/* Results Counter */}
              <div className="pt-6 border-t" style={{ borderColor: '#e3e6e8' }}>
                <p className="text-xs font-medium" style={{ color: '#798086' }}>
                  Showing <span className="font-bold" style={{ color: '#181f25' }}>{filteredPosts.length}</span> results
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Masonry Grid */}
          <div className="lg:col-span-9">
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg font-medium" style={{ color: '#798086' }}>
                  No content found matching your filters.
                </p>
                <button
                  onClick={() => {
                    setActiveFilter('all');
                    setPlatformFilter('all');
                    setSelectedTags([]);
                  }}
                  className="mt-4 text-sm font-bold underline"
                  style={{ color: '#f7c01d' }}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div 
                ref={masonryRef}
                className="masonry-grid"
                style={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  marginLeft: '-24px'
                }}
              >
                {/* Masonry sizer - determines column width */}
                <div className="masonry-sizer" style={{ 
                  width: 'calc(33.333% - 24px)',
                  boxSizing: 'border-box'
                }}></div>

                {filteredPosts.map(post => {
                  const influencer = getInfluencer(post.influencerId);
                  if (!influencer) return null;

                  // Calculate aspect ratio style
                  const isVertical = post.aspectRatio === '9:16';
                  const aspectStyle = isVertical 
                    ? { aspectRatio: '9/16' }
                    : { aspectRatio: '16/9' };

                  return (
                    <div
                      key={post.id}
                      className="masonry-item"
                      style={{
                        width: 'calc(33.333% - 24px)',
                        marginBottom: '24px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div
                        className="group cursor-pointer transition-all duration-300"
                        style={{
                          border: '1px solid #e3e6e8',
                          backgroundColor: '#ffffff'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#f7c01d';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#e3e6e8';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {/* Video Thumbnail - Dynamic Aspect Ratio */}
                        <div className="relative overflow-hidden" style={aspectStyle}>
                          {/* Background Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                          
                          {/* Emoji/Icon */}
                          <div className="absolute inset-0 flex items-center justify-center text-8xl">
                            {post.thumbnail}
                          </div>

                          {/* Platform Badge */}
                          <div className="absolute top-3 right-3 z-20">
                            <div className="px-2 py-1 flex items-center gap-1.5" style={{ backgroundColor: '#181f25' }}>
                              {post.platform === 'tiktok' ? (
                                <Video className="w-3 h-3" style={{ color: '#f7c01d' }} />
                              ) : (
                                <Youtube className="w-3 h-3" style={{ color: '#f7c01d' }} />
                              )}
                              <span className="text-[8px] font-black uppercase tracking-wider text-white">
                                {post.platform === 'tiktok' ? 'TikTok' : 'YouTube'}
                              </span>
                            </div>
                          </div>

                          {/* Badges */}
                          <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                            {post.isTrending && (
                              <div className="px-2 py-1 flex items-center gap-1.5" style={{ backgroundColor: '#181f25' }}>
                                <TrendingUp className="w-3 h-3" style={{ color: '#f7c01d' }} />
                                <span className="text-[8px] font-black uppercase tracking-wider text-white">Trending</span>
                              </div>
                            )}
                            {post.isFeatured && (
                              <div className="px-2 py-1 flex items-center gap-1.5" style={{ backgroundColor: '#181f25' }}>
                                <Star className="w-3 h-3" style={{ color: '#f7c01d' }} />
                                <span className="text-[8px] font-black uppercase tracking-wider text-white">Featured</span>
                              </div>
                            )}
                          </div>

                          {/* Aspect Ratio Badge */}
                          <div className="absolute bottom-12 left-3 z-20">
                            <span className="px-2 py-1 text-[8px] font-black uppercase tracking-wider" style={{ 
                              backgroundColor: 'rgba(24, 31, 37, 0.8)',
                              color: '#ffffff'
                            }}>
                              {post.aspectRatio}
                            </span>
                          </div>

                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(247, 192, 29, 0.9)' }}>
                              <Play className="w-6 h-6 ml-1" style={{ color: '#181f25' }} />
                            </div>
                          </div>

                          {/* Vehicle Badge at Bottom */}
                          <div className="absolute bottom-3 left-3 z-20">
                            <span className="px-2 py-1 text-[9px] font-black uppercase tracking-wider" style={{ 
                              backgroundColor: '#f7c01d',
                              color: '#181f25'
                            }}>
                              {post.vehicle}
                            </span>
                          </div>
                        </div>

                        {/* Content Info */}
                        <div className="p-4">
                          {/* Title */}
                          <h3 className="text-sm font-bold leading-snug mb-3 line-clamp-2" style={{ color: '#181f25' }}>
                            {post.title}
                          </h3>

                          {/* Influencer Info */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 flex items-center justify-center text-xs font-black" style={{ 
                                backgroundColor: '#f1f2f4',
                                color: '#181f25'
                              }}>
                                {influencer.avatar}
                              </div>
                              <div>
                                <p className="text-xs font-bold" style={{ color: '#181f25' }}>{influencer.name}</p>
                                <p className="text-[10px]" style={{ color: '#798086' }}>{influencer.username}</p>
                              </div>
                            </div>
                            <span className="text-[9px] font-bold uppercase px-2 py-1" style={{ 
                              backgroundColor: '#f1f2f4',
                              color: '#798086'
                            }}>
                              {influencer.tier}
                            </span>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.tags.slice(0, 3).map(tag => {
                              const tagColor = TAGS.find(t => t.name === tag)?.color || '#798086';
                              return (
                                <span
                                  key={tag}
                                  className="text-[9px] font-medium px-2 py-0.5"
                                  style={{
                                    backgroundColor: `${tagColor}15`,
                                    color: tagColor
                                  }}
                                >
                                  {tag}
                                </span>
                              );
                            })}
                          </div>

                          {/* Engagement Metrics */}
                          <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #e3e6e8' }}>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" style={{ color: '#798086' }} />
                                <span className="text-[10px] font-medium" style={{ color: '#798086' }}>{post.views}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-3 h-3" style={{ color: '#798086' }} />
                                <span className="text-[10px] font-medium" style={{ color: '#798086' }}>{post.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" style={{ color: '#798086' }} />
                                <span className="text-[10px] font-medium" style={{ color: '#798086' }}>{post.comments}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Share2 className="w-3 h-3" style={{ color: '#798086' }} />
                              <span className="text-[10px] font-medium" style={{ color: '#798086' }}>{post.shares}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
