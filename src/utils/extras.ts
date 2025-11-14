export const hexToRgba = (hex, alpha = 1) => {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


export function formatTime(timestampString: string) {

  const dateObject = new Date(timestampString.replace(' ', 'T'));

  const formattedDate = dateObject.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return formattedDate + " Utc"
}


export function formatName(name) {
  // format name with only first name before space with max 10 characters
  if (!name) return "Unknown User";
  const firstName = name.split(' ')[0];
  return firstName.length > 10 ? firstName.slice(0, 10) + '...' : firstName;
}
