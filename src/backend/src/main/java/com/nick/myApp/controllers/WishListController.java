package com.nick.myApp.controllers;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.nick.myApp.dto.WishListRequest;
import com.nick.myApp.models.*;
import com.nick.myApp.repos.CoursesRepo;
import com.nick.myApp.repos.UsersRepo;
import com.nick.myApp.repos.WishListRepo;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/wishlist")
public class WishListController {

    @Autowired
    private WishListRepo wishListRepo;

    @Autowired
    private CoursesRepo coursesRepo;

    @Autowired
    private UsersRepo usersRepo;

    /**
     * 統一處理用戶身份：支援 Email 或 Mobile 登入
     */
    private Users getUser(Authentication authentication) {
        String identifier = authentication.getName();

        if (identifier.contains("@")) {
            // 當作 email
            return usersRepo.findByEmailIgnoreCase(identifier)
                    .orElseThrow(() -> new RuntimeException("User not found: " + identifier));
        } else {
            // 當作 mobile
            return usersRepo.findByMobile(identifier)
                    .orElseThrow(() -> new RuntimeException("User not found: " + identifier));
        }
    }

    // 查看 wishlist
    @GetMapping
    public List<WishList> getWishlist(Authentication authentication) {
        Users user = getUser(authentication);
        return wishListRepo.findByUser_Id(user.getId());
    }

    // 比較 wishlist 入面嘅兩個課程
    @GetMapping("/compare")
    public ResponseEntity<List<Courses>> compareCourses(
            @RequestParam(name = "courseId1") Integer courseId1,
            @RequestParam(name = "courseId2") Integer courseId2,
            Authentication authentication) {

        if (courseId1 == null || courseId2 == null || courseId1.equals(courseId2)) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }

        Users user = getUser(authentication);
        Integer userId = user.getId();

        boolean hasCourse1 = wishListRepo.existsByUser_IdAndCourse_Id(userId, courseId1);
        boolean hasCourse2 = wishListRepo.existsByUser_IdAndCourse_Id(userId, courseId2);

        if (!hasCourse1 || !hasCourse2) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }

        Optional<Courses> optCourse1 = coursesRepo.findById(courseId1);
        Optional<Courses> optCourse2 = coursesRepo.findById(courseId2);

        if (optCourse1.isEmpty() || optCourse2.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }

        return ResponseEntity.ok(List.of(optCourse1.get(), optCourse2.get()));
    }

    // 加入 wishlist
    @PostMapping("/add")
    public ResponseEntity<?> addToWishlist(@RequestBody WishListRequest request,
                                           Authentication authentication) {
        Users user = getUser(authentication);
        Integer courseId = request.getCourseId();

        if (wishListRepo.findByUser_IdAndCourse_Id(user.getId(), courseId).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                                 .body("Course already exists in wishlist");
        }

        Courses course = coursesRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        WishList wish = new WishList();
        wish.setUser(user);
        wish.setCourse(course);
        wishListRepo.save(wish);

        return ResponseEntity.ok(course);
    }

    // 從 wishlist 移除課程
    @DeleteMapping("/{courseId}")
    public ResponseEntity<String> removeFromWishlist(@PathVariable Integer courseId,
                                                     Authentication authentication) {
        Users user = getUser(authentication);

        boolean exists = wishListRepo.existsByUser_IdAndCourse_Id(user.getId(), courseId);
        if (!exists) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Course not found in wishlist");
        }

        wishListRepo.deleteByUser_IdAndCourse_Id(user.getId(), courseId);
        return ResponseEntity.ok("Course has been removed from wishlist");
    }
}
