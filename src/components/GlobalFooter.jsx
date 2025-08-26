import { motion } from 'framer-motion';

const GlobalFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="bg-gray-900 text-white py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="footer-meta text-center space-y-2">
          <p className="text-gray-300">
            © {currentYear} 我的课程表. All rights reserved.
          </p>
          <div className="text-sm text-gray-400 space-x-4">
            <span>基于 React + Vite 构建</span>
            <span>•</span>
            <span>使用 TailwindCSS 设计</span>
            <span>•</span>
            <span>Framer Motion 动效</span>
          </div>
          <div className="text-xs text-gray-500 mt-4">
            <p>ICP备案号：待填写 | 网站部署于 GitHub Pages</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default GlobalFooter;
