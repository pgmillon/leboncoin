import codecs
from setuptools import setup, find_packages

setup(
    name='leboncoin-api',
    version='1.0.0.dev1',
    license='MIT',
    author='Pierre-Gildas MILLON',
    author_email='pg.millon@gmail.com',
    description='A simple API for LeBonCoin.fr',
    long_description=codecs.open('README.rst', encoding='utf-8').read(),
    url='https://github.com/pgmillon/leboncoin',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'Topic :: System :: Networking',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 2.7'
    ],
    keywords='leboncoin',
    install_requires=[
        'flask',
        'flask_jsontools',
        'flask_restless',
        'tornado',
        'beautifulsoup4',
        'mock',
        'requests'
    ]
)