-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 26, 2014 at 02:46 PM
-- Server version: 5.5.40
-- PHP Version: 5.5.18-1+deb.sury.org~precise+1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `rate-course`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE IF NOT EXISTS `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_number` varchar(10) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `description` text,
  `department` varchar(255) DEFAULT NULL,
  `overall_rating` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `course_number`, `course_name`, `description`, `department`, `overall_rating`) VALUES
(1, 'CS201', 'Discrete Mathematics', 'Notion of proof: proof by counter-example, the contrapositive, proof by contradiction, inductive proofs.\r\n\r\nAlgebra: Motivation of algebraic structures; review of basic group theory with emphasis to finite groups: subgroups and group homomorphism, Lagrange''s theorem. Commutative rings, ideals. Finite fields and their elementary properties. Some CS applications (e.g., RSA, error correcting codes).\r\n\r\nCombinatorics: Basic counting techniques, pigeon-hole principle, recurrence relations, generating functions, Polya''s counting theorem. Basics of graph theory. Introduction to probabilistic method in combinatorics.\r\n\r\nFormal logic: Propositional logic: proof system, semantics, completeness, compactness. Length of proofs, polynomial size proofs, efficiency of proof systems. First order logic: models, proof system, compactness. Examples of formal proofs in, say, number theory or group theory. Some advanced topics. E.g., CS application of logic, introduction to modal and temporal logics, Or, formal number theory including incompleteness theorem, Or, elements of proof theory including cut elimination, Or zero-one law for first order logic', 'CSE', NULL),
(2, 'CS210', 'Data Structure and Algorithms', 'Order Analysis: Objectives of time analysis of algorithms; Big-oh and Theta notations.\r\n\r\nElementary Data Structures: Arrays, Linked lists, Stacks (example: expression evaluation), and Queues. Binary search trees. Red-Black trees. Hash tables.\r\n\r\nSorting and Divide and Conquer Strategy: Merge-sort; D-and-C with Matrix Multiplication as another example. Quick-sort with average case analysis. Heaps and heap-sort. Lower bound on comparison-based sorting and Counting sort. Radix sort.\r\n\r\nB-trees.\r\n\r\nDynamic Programming: methodology and examples (Fibonacci numbers, matrix sequence multiplication, longest common subsequence, convex polygon triangulation).\r\n\r\nGreedy Method: Methodology, examples (lecture scheduling, process scheduling) and comparison with DP (more examples to come later in graph algorithms).\r\n\r\nGraph Algorithms: Basics of graphs and their representations. BFS. DFS. Topological sorting. Minimum spanning trees (Kruskal and Prim''s algorithms and brief discussions of disjoint set and Fibonacci heap data structures). Shortest Paths (Dijkstra, Bellman-Ford, Floyd-Warshall).', 'CSE', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `course_offering`
--

CREATE TABLE IF NOT EXISTS `course_offering` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `professor_id` int(11) DEFAULT NULL,
  `overall_rating` float DEFAULT NULL,
  `number_of_students` int(11) DEFAULT NULL,
  `website` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `course_offering`
--

INSERT INTO `course_offering` (`id`, `course_id`, `year`, `semester`, `professor_id`, `overall_rating`, `number_of_students`, `website`) VALUES
(1, 1, 2014, 1, 1, NULL, 104, NULL),
(2, 1, 2013, 2, 2, NULL, 100, NULL),
(3, 2, 2014, 1, 2, NULL, 120, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `course_offering_rating_param`
--

CREATE TABLE IF NOT EXISTS `course_offering_rating_param` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_offering_id` int(11) NOT NULL,
  `rating_param_id` int(11) NOT NULL,
  `weight` float NOT NULL,
  `max_value` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `course_offering_rating_param`
--

INSERT INTO `course_offering_rating_param` (`id`, `course_offering_id`, `rating_param_id`, `weight`, `max_value`) VALUES
(1, 1, 1, 25, 5),
(2, 1, 2, 20, 5),
(3, 1, 3, 30, 1),
(4, 2, 1, 28, 5),
(5, 3, 3, 50, 1);

-- --------------------------------------------------------

--
-- Table structure for table `discussion`
--

CREATE TABLE IF NOT EXISTS `discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `as_anon` tinyint(1) NOT NULL DEFAULT '0',
  `course_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `create_time` int(11) NOT NULL,
  `spam_flag_count` int(11) NOT NULL DEFAULT '0',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `discussion`
--

INSERT INTO `discussion` (`id`, `user_id`, `as_anon`, `course_id`, `comment`, `create_time`, `spam_flag_count`, `is_deleted`) VALUES
(1, 1, 0, 1, 'This is a text comment from database', 1414129735, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `professor`
--

CREATE TABLE IF NOT EXISTS `professor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) DEFAULT NULL,
  `designation` varchar(40) NOT NULL,
  `department` varchar(40) NOT NULL,
  `email` varchar(40) DEFAULT NULL,
  `homepage_url` varchar(255) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `professor`
--

INSERT INTO `professor` (`id`, `first_name`, `last_name`, `designation`, `department`, `email`, `homepage_url`, `photo_url`) VALUES
(1, 'S K', 'Mehta', 'Professor', 'CSE', 'skmehta@cse.iitk.ac.in', 'http://cse.iitk.ac.in/users/skmehta', 'https://lh3.googleusercontent.com/-6JL0jDPwEJE/UcXmL3fjRGI/AAAAAAAAACA/1hSIG94rL9U/s600-no/Jun%2B22%2C%2B2013%2B11%3A30%3A10%2BPM.jpg'),
(2, 'Sumit', 'Ganguly', 'Professor', 'CSE', 'sganguly@cse.iitk.ac.in', 'http://cse.iitk.ac.in/users/sganguly', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE IF NOT EXISTS `rating` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `as_anon` tinyint(1) NOT NULL DEFAULT '0',
  `course_offering_id` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`id`, `user_id`, `as_anon`, `course_offering_id`, `create_time`, `is_deleted`) VALUES
(1, 1, 0, 1, 1414129735, 0);

-- --------------------------------------------------------

--
-- Table structure for table `rating_param`
--

CREATE TABLE IF NOT EXISTS `rating_param` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `type` int(11) NOT NULL,
  `sort_order` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `rating_param`
--

INSERT INTO `rating_param` (`id`, `name`, `type`, `sort_order`) VALUES
(1, 'How much were you satisfied by the course content?', 1, 100),
(2, 'How much did you learn from the course?', 1, 98),
(3, 'Is the course challenging?', 2, 91);

-- --------------------------------------------------------

--
-- Table structure for table `rating_value`
--

CREATE TABLE IF NOT EXISTS `rating_value` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rating_id` int(11) NOT NULL,
  `rating_param_id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `rating_value`
--

INSERT INTO `rating_value` (`id`, `rating_id`, `rating_param_id`, `value`, `is_deleted`) VALUES
(1, 1, 1, 4, 0),
(2, 1, 2, 5, 0),
(3, 1, 3, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE IF NOT EXISTS `review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rating_id` int(11) NOT NULL,
  `course_comment` text,
  `prof_comment` text,
  `spam_flag_count` int(11) DEFAULT '0',
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `rating_id`, `course_comment`, `prof_comment`, `spam_flag_count`, `is_deleted`) VALUES
(1, 1, 'This course is awesome', 'This professor is awesome', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `spam`
--

CREATE TABLE IF NOT EXISTS `spam` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `is_resolved` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  `email` varchar(40) DEFAULT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `last_login` int(11) DEFAULT NULL,
  `last_ip` varchar(25) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `photo_url` varchar(255) DEFAULT NULL,
  `password_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `login`, `password`, `email`, `first_name`, `last_name`, `last_login`, `last_ip`, `is_active`, `photo_url`, `password_token`) VALUES
(1, 'ksaurav', 'cs252', 'ksaurav@iitk.ac.in', 'Saurav', 'Kumar', NULL, NULL, 1, 'http://home.iitk.ac.in/~ksaurav/saurav.jpg', NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
