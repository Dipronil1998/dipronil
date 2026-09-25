import React, { createContext, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { portfolioData as initialFallbackData } from '../data/portfolioData';
import { fetchHomeData } from '../services/api';
import { getApiBaseUrl, isLocalhost } from '../utils/apiConfig';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['homeData'],
    queryFn: fetchHomeData,
    placeholderData: initialFallbackData,
    staleTime: 1000 * 60 * 3, // 3 minutes cache
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const activeData = data || initialFallbackData;

  const value = {
    portfolio: activeData,
    personal: activeData.personal || initialFallbackData.personal,
    stats: activeData.stats || initialFallbackData.stats,
    about: activeData.about || initialFallbackData.about,
    skills: activeData.skills || initialFallbackData.skills,
    projects: activeData.projects || initialFallbackData.projects,
    mediumPosts: activeData.mediumPosts || initialFallbackData.mediumPosts,
    certificates: activeData.certificates || initialFallbackData.certificates,
    experience: activeData.experience || initialFallbackData.experience,
    education: activeData.education || initialFallbackData.education,
    testimonials: activeData.testimonials || initialFallbackData.testimonials,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    isFromBackend: Boolean(activeData.isFromBackend),
    apiBaseUrl: getApiBaseUrl(),
    isLocal: isLocalhost(),
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
