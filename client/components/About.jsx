import React from 'react';

function About() {
  return (
    <div className='h-96 w-full relative px-10'>
      <div className='w-auto absolute -top-20 left-10 px-2 -skew-x-12 rounded-lg bg-dark-secondary-900 '>
        <h1 className='text-4xl text-dark-third-900'>ABOUT US</h1>
      </div>
      <p className='font-bold'>
        &quot;In our <span className='bg-dark-secondary-500 px-2 italic'>&ldquo;e-learning platform&rdquo;</span>, we are dedicated to providing an enriching and accessible educational experience for all. We offer a wide range of free courses that cover various topics and disciplines, allowing you to acquire valuable knowledge and skills from the comfort of your home.

        In addition to courses, we organize exciting events related to education and learning, where you can participate and connect with other students and experts in the field. These events provide you with the opportunity to expand your professional network and explore new perspectives.
        <br/>
        <br/>
        <span className='bg-dark-secondary-500 px-2 italic'>&ldquo;Our virtual campus&rdquo;</span> is an interactive and user-friendly environment designed to provide an immersive learning experience. Here, you will find educational resources, study materials, assessments, and progress tracking tools that will help you make the most of your study time.

        Furthermore, we offer an online chat where you can interact with instructors and fellow students. This gives you the opportunity to ask questions, participate in discussions, exchange ideas, and collaborate on joint projects.

        <br/>
        <br/>
        <span className='bg-dark-secondary-500 px-2 italic'>&ldquo;In Summary&rdquo;</span>, our e-learning platform is the perfect place for those who want to learn flexibly and conveniently. Whether you&apos;re looking to expand your knowledge, attend engaging events, explore our virtual campus, or connect with a vibrant learning community, we have everything you need to embark on your educational journey.&quot;
      </p>
    </div>
  );
}

export default About;
