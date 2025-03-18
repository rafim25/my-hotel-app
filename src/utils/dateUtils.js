export function formatDate(dateString) {
  const date = new Date(dateString);
  // Use a consistent date format that works across server and client
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
} 