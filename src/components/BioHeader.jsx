import { motion } from 'framer-motion';

const BioHeader = () => {
  return (
    <motion.header 
      className="text-center py-8 bg-gradient-to-r from-blue-50 to-indigo-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="display-name text-4xl font-bold text-gray-900 mb-2">
          我的课程表
        </h1>
        <p className="tagline text-lg text-gray-600">
          智能课程管理，让学习更有序
        </p>
      </div>
    </motion.header>
  );
};

export default BioHeader;
