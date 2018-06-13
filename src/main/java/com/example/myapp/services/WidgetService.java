package com.example.myapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.model.Lesson;
import com.example.myapp.model.Widget;
import com.example.myapp.repositories.CourseRepository;
import com.example.myapp.repositories.LessonRepository;
import com.example.myapp.repositories.ModuleRepository;
import com.example.myapp.repositories.WidgetRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class WidgetService {
	@Autowired
	CourseRepository courseRepository;

	@Autowired
	ModuleRepository moduleRepository;

	@Autowired
	LessonRepository lessonRepository;

	@Autowired
	WidgetRepository widgetRepository;

	@GetMapping("/api/widget")
	public List<Widget> findAllWidgets() {
		return (List<Widget>) widgetRepository.findAll();
	}

	@GetMapping("/api/widget/{widgetId}")
	public Widget findWidgetById(@PathVariable("widgetId") int widgetId) {
		Optional<Widget> data = widgetRepository.findById(widgetId);
		if (data.isPresent()) {
			return (Widget) data.get();
		}
		return null;
	}

	@GetMapping("/api/lesson/{lessonId}/widget")
	public List<Widget> findWidgetsByLessonId(@PathVariable("lessonId") int lessonId) {
		Optional<Lesson> data = lessonRepository.findById(lessonId);
		if (data.isPresent()) {
			return data.get().getWidgets();
		}
		return null;
	}

	@PostMapping("/api/lesson/{lessonId}/widget")
	public List<Widget> createWidgetByLessonId(@PathVariable("lessonId") int lessonId, @RequestBody Widget widget) {
		Optional<Lesson> data = lessonRepository.findById(lessonId);
		if (data.isPresent()) {
			widget.setLesson(data.get());
			widgetRepository.save(widget);
		}
		return null;
	}
	
	@PostMapping("/api/lesson/{lessonId}/widgets/save")
	public List<Widget> saveWidgetsByLessonId(@PathVariable("lessonId") int lessonId, @RequestBody List<Widget> widgets) {
		Optional<Lesson> data = lessonRepository.findById(lessonId);
		if (data.isPresent()) {
			for(Widget widget:widgets) {
				widget.setLesson(data.get());	
			}
			widgetRepository.saveAll(widgets);
		}
		return null;
	}

	@PutMapping("/api/widget/{widgetId}")
	public List<Widget> UpdateWidgetById(@PathVariable("widgetId") int widgetId, @RequestBody Widget newWidget) {
		Optional<Widget> data = widgetRepository.findById(widgetId);
		if (data.isPresent()) {
			Widget widget = data.get();
			widget.setHeight(newWidget.getHeight());
			widget.setHref(newWidget.getHref());
			widget.setListItems(newWidget.getListItems());
			widget.setListType(newWidget.getListType());
			widget.setPosition(newWidget.getPosition());
			widget.setSize(newWidget.getSize());
			widget.setSrc(newWidget.getSrc());
			widget.setStyle(newWidget.getStyle());
			widget.setText(newWidget.getStyle());
			widget.setWidth(newWidget.getWidth());
			widget.setClassName(newWidget.getClassName());
			widgetRepository.save(widget);
		}
		return null;
	}

	@DeleteMapping("/api/widget/{widgetId}")
	public void deleteWidgetById(@PathVariable("widgetId") int widgetId) {
		widgetRepository.deleteById(widgetId);
	}
}
