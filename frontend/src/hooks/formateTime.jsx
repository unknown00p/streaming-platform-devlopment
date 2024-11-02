function formatTimeDifference(date) {
        
    const now = new Date();
    const timestamp = new Date(date);
    const diffInSeconds = Math.floor(Math.abs(now - timestamp) / 1000);
  
    const units = [
      { label: 'year', value: 365 * 24 * 60 * 60 },
      { label: 'month', value: 30 * 24 * 60 * 60 },
      { label: 'week', value: 7 * 24 * 60 * 60 },
      { label: 'day', value: 24 * 60 * 60 },
      { label: 'hour', value: 60 * 60 },
      { label: 'minute', value: 60 },
    ];
  
    for (const { label, value } of units) {
      const diff = Math.floor(diffInSeconds / value);
      if (diff > 0) {
        return `${diff} ${label}${diff > 1 ? 's' : ''} ago`;
      }
    }
  
    return 'just now';
  }

export default formatTimeDifference