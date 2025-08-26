import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const SocialStrip = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com',
      color: 'hover:text-gray-900'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com',
      color: 'hover:text-blue-500'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com',
      color: 'hover:text-blue-700'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:your.email@example.com',
      color: 'hover:text-red-500'
    }
  ];

  return (
    <motion.section 
      className="py-8 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          联系方式
        </h3>
        
        <ul className="social-icons flex justify-center gap-6">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            
            return (
              <motion.li 
                key={social.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    flex items-center justify-center w-12 h-12 
                    text-gray-600 ${social.color} 
                    bg-white rounded-full shadow-md
                    transition-all duration-300 ease-in-out
                    hover:shadow-lg hover:scale-110
                  `}
                  aria-label={social.name}
                >
                  <IconComponent size={20} />
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.section>
  );
};

export default SocialStrip;
