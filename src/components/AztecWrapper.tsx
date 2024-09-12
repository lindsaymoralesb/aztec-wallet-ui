let bbModule: any;

export const initAztec = async () => {
  if (!bbModule) {
    try {
      if (process.env.NODE_ENV === 'production') {
        // In production, the module should be available globally due to the unpkg import
        bbModule = (window as any).aztec_bb;
      } else {
        // In development, import it normally
        bbModule = await import('@aztec/bb.js');
      }
      await bbModule.initializeBarretenberg();
      console.log('Aztec BB.js initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Aztec BB.js:', error);
      throw error;
    }
  }
  return bbModule;
};
